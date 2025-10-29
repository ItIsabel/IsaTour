import { LitElement, html, css } from 'lit';
import { ciudadService } from './ciudadService.js';
import { circuitoService } from '../circuito/circuitoService.js';
import { Styles } from './ciudad-lista-styles.js';
export class PageCities extends LitElement {
  static styles = Styles;

  static properties = {
    ciudades: { type: Array },
    ciudadesFiltradas: { type: Array },
    loading: { type: Boolean },
    error: { type: String },
    searchTerm: { type: String },
    showDialog: { type: Boolean },
    selectedCiudad: { type: Object },
    circuitos: { type: Array },
    loadingCircuitos: { type: Boolean },
    errorCircuitos: { type: String },
    filterPais: { type: String },
    countryList: { type: Array },
    sortBy: { type: String },
    sortOrder: { type: String }
  };

  constructor() {
    super();
    this.ciudades = [];
    this.ciudadesFiltradas = [];
    this.loading = false;
    this.error = '';
    this.searchTerm = '';
    this.showDialog = false;
    this.selectedCiudad = null;
    this.circuitos = [];
    this.loadingCircuitos = false;
    this.errorCircuitos = '';
    this.filterPais = '';
    this.countryList = [];
    this.sortBy = 'precio';
    this.sortOrder = 'asc';
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadCiudades();
  }

  async loadCiudades() {
    try {
      this.loading = true;
      this.error = '';
      this.ciudades = await ciudadService.getCiudades();
      this.ciudadesFiltradas = [...this.ciudades];
      // Generate country list from cities data
      this.countryList = [...new Set(this.ciudades.map(ciudad => ciudad.pais))].filter(pais => pais != null).sort();
    } catch (error) {
      this.error = 'Error al cargar las ciudades. Por favor, intenta de nuevo.';
      console.error('Error loading cities:', error);
    } finally {
      this.loading = false;
    }
  }

  handleSearch(e) {
    this.searchTerm = e.target.value.toLowerCase();
    this.filterCiudades();
  }

  handleCountryFilterChange(e) {
    this.filterPais = e.target.value;
    this.filterCiudades();
  }

  filterCiudades() {
    let filtered = [...this.ciudades];

    // Apply country filter
    if (this.filterPais) {
      filtered = filtered.filter(ciudad => ciudad.pais === this.filterPais);
    }

    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter(ciudad =>
        ciudad.nombre.toLowerCase().includes(this.searchTerm)
      );
    }

    // Sort alphabetically by city name, case-insensitive
    filtered.sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()));

    this.ciudadesFiltradas = filtered;
  }

  async loadCircuitosForCiudad(ciudad) {
    this.loadingCircuitos = true;
    this.errorCircuitos = '';
    this.circuitos = [];
    try {
      const filters = { idCiudad: ciudad.id };
      this.circuitos = await circuitoService.getCircuitos(filters);
      this.sortCircuitos();
    } catch (error) {
      this.errorCircuitos = 'Error al cargar circuitos para la ciudad.';
    } finally {
      this.loadingCircuitos = false;
    }
  }

  sortCircuitos() {
    if (!this.circuitos) return;

    this.circuitos.sort((a, b) => {
      let compare = 0;
      if (this.sortBy === 'precio') {
        compare = a.precio - b.precio;
      } else if (this.sortBy === 'dias') {
        compare = a.dias - b.dias;
      }
      return this.sortOrder === 'asc' ? compare : -compare;
    });
  }

  toggleSort(column) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    this.sortCircuitos();
  }

  async handleCityClick(ciudad) {
    this.selectedCiudad = ciudad;
    await this.loadCircuitosForCiudad(ciudad);
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    this.selectedCiudad = null;
    this.circuitos = [];
    this.errorCircuitos = '';
  }

  _navigateToContacto() {
    this.dispatchEvent(new CustomEvent('page-change', {
      detail: { page: 'contacto' },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (this.loading) {
      return html`
        <div class="loading">
          <p>Cargando ciudades...</p>
        </div>
      `;
    }

    return html`
      <div class="header">
        <h1>Ciudades con circuitos</h1>
        <div class="filters-container">
          <div class="filter-item">
            <label for="search-input">Buscar ciudades:</label>
            <input
              id="search-input"
              type="text"
              class="search-input"
              placeholder="Buscar ciudades..."
              @input="${this.handleSearch}"
            >
          </div>

          <div class="filter-item">
            <label for="country-filter">Filtrar por País:</label>
            <select id="country-filter" @change="${this.handleCountryFilterChange}">
              <option value="">-- Todos los países --</option>
              ${this.countryList.map(pais => html`
                <option value="${pais}" ?selected="${this.filterPais === pais}">${pais}</option>
              `)}
            </select>
          </div>
        </div>
      </div>

      ${this.error ? html`
        <div class="error">
          ${this.error}
        </div>
      ` : ''}

      <div class="stats">
        <div class="stats-number">${this.ciudadesFiltradas.length}</div>
        <div class="stats-label">ciudades encontradas</div>
      </div>

      <div class="cities-list-grid">
        ${this.ciudadesFiltradas.length > 0 ? 
          this.ciudadesFiltradas.map(ciudad => html`
            <div class="city-name-item" @click="${() => this.handleCityClick(ciudad)}">
              ${ciudad.nombre}
            </div>
          `) : 
          html`
            <div class="no-cities">
              No se encontraron ciudades.
            </div>
          `
        }
      </div>

      ${this.showDialog ? html`
        <dialog open class="ciudad-dialog">
          <h2>Circuitos en ${this.selectedCiudad.nombre}</h2>
          <button class="popup-close-button" @click="${this.closeDialog}" aria-label="Cerrar popup">×</button>
          ${this.loadingCircuitos ? html`<p>Cargando circuitos...</p>` : ''}
          ${this.errorCircuitos ? html`<p class="error">${this.errorCircuitos}</p>` : ''}
          ${this.circuitos.length > 0 ? html`
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th @click="${() => this.toggleSort('dias')}" style="cursor:pointer;">
                    Días
                    ${this.sortBy === 'dias' ? (this.sortOrder === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th @click="${() => this.toggleSort('precio')}" style="cursor:pointer;">
                    Precio
                    ${this.sortBy === 'precio' ? (this.sortOrder === 'asc' ? '▲' : '▼') : ''}
                  </th>
                </tr>
              </thead>
              <tbody>
                ${this.circuitos.map(circuito => html`
                  <tr @click="${() => circuito.url && window.open(circuito.url, '_blank')}" style="${circuito.url ? 'cursor: pointer;' : ''}">
                    <td>${circuito.nombre}</td>
                    <td>${circuito.dias}</td>
                    <td>
                      ${circuito.precio?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) ?? 'N/A'}
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          ` : html`<p>No hay circuitos disponibles para esta ciudad.</p>`}
        </dialog>
      ` : ''}
    `;
  }
}

customElements.define('page-cities', PageCities);
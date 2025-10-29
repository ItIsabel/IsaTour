import { LitElement, html } from 'lit';
import { circuitoService } from './circuitoService.js';
import { Styles } from './circuito-lista-styles.js';

export class PageCircuits extends LitElement {
  static styles = Styles;
  
  static properties = {
    circuitos: { type: Array },
    loading: { type: Boolean },
    error: { type: String },
    sortBy: { type: String },
    sortOrder: { type: String },
    filterPais: { type: String },
    filterDias: { type: Number },
    filterTouroperador: { type: String },
    countryList: { type: Array }
  };

  constructor() {
    super();
    this.circuitos = [];
    this.loading = false;
    this.error = '';
    this.loadingExtensions = {};
    this.sortBy = '';
    this.sortOrder = 'asc';
    this.filterPais = '';
    this.filterDias = null;
    this.filterTouroperador = '';
    this.countryList = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadCircuitos();
    await this.loadCountryList();
  }

  async loadCountryList(filters = {}) {
    try {
      this.countryList = await circuitoService.getCountryList(filters);
      this.countryList = [...new Set(this.countryList)].filter(pais => pais != null).sort();
    } catch (error) {
      console.error('Error loading country list:', error);
    }
  }

  getCurrentFiltersForCountry() {
    const filters = {};
    if (this.filterDias !== null) {
      filters.dias = this.filterDias;
    }
    if (this.filterTouroperador) {
      filters.touroperador = this.filterTouroperador;
    }
    return filters;
  }

  async loadCircuitos() {
    try {
      this.loading = true;
      this.error = '';
      const filters = {};
      if (this.filterDias !== null) {
        filters.dias = this.filterDias;
      }
      if (this.filterTouroperador) {
        filters.touroperador = this.filterTouroperador;
      }
      if (this.filterPais) {
        filters.nombrePais = this.filterPais;
      }
      this.circuitos = await circuitoService.getCircuitos(filters);

    } catch (error) {
      this.error = 'Error al cargar los circuitos. Por favor, intenta de nuevo.';
      console.error('Error loading circuits:', error);
    } finally {
      this.loading = false;
    }
  }

  sortCircuitos() {
    if (!this.circuitos) return;

    this.circuitos = [...this.circuitos].sort((a, b) => {
      let compare = 0;
      if (this.sortBy === 'precio') {
        compare = a.precio - b.precio;
      } else if (this.sortBy === 'duracion') {
        compare = a.dias - b.dias;
      }
      return this.sortOrder === 'asc' ? compare : -compare;
    });
    this.requestUpdate();
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



  render() {
    if (this.loading) {
      return html`
        <div class="loading">
          <p>Cargando circuitos...</p>
        </div>
      `;
    }

    return html`
      <div class="header">
        <h1>Circuitos Disponibles</h1>
        <div class="filters-container">
          <div class="filter-item">
            <label for="pais-filter">Filtrar por País:</label>
            <select id="pais-filter" @change="${this.handleFilterChange}">
              <option value="">-- Todos --</option>
              ${[...this.countryList].filter(pais => pais != null).sort((a, b) => a.localeCompare(b)).map(pais => html`
                <option value="${pais}" ?selected="${this.filterPais === pais}">${pais}</option>
              `)}
            </select>
          </div>

              <div class="filter-item">
                <label for="dias-filter">Filtrar por Días:</label>
                <select id="dias-filter" @change="${this.handleDiasFilterChange}">
                  <option value="">-- Todos --</option>
                  ${[...new Set(this.circuitos.map(circuito => circuito.dias))].sort((a, b) => a - b).map(dias => html`
                    <option value="${dias}" ?selected="${this.filterDias === dias}">${dias} días</option>
                  `)}
                </select>
              </div>

          <div class="filter-item">
            <label for="touroperador-filter">Filtrar por Touroperador:</label>
            <select id="touroperador-filter" @change="${this.handleTouroperadorFilterChange}">
              <option value="">-- Todos --</option>
              ${[...new Set(this.circuitos.map(circuito => circuito.touroperador))].sort().map(touroperador => html`
                <option value="${touroperador}" ?selected="${this.filterTouroperador === touroperador}">${touroperador}</option>
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

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th @click="${() => this.toggleSort('duracion')}" style="cursor:pointer;">
              Duración
              ${this.sortBy === 'duracion' ? (this.sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th @click="${() => this.toggleSort('precio')}" style="cursor:pointer;">
              Precio
              ${this.sortBy === 'precio' ? (this.sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          ${this.circuitos.map(circuito => html`
            <tr @click="${() => this.handleRowClick(circuito)}" style="cursor: pointer;">
              <td><img src="media/${circuito.touroperador}.png" alt="${circuito.touroperador}"></td>
              <td>${circuito.nombre.charAt(0).toUpperCase() + circuito.nombre.slice(1).toLowerCase()}</td>
              <td>${circuito.dias} días</td>
              <td>${circuito.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
            </tr>
          `)}
        </tbody>
      </table>

    ${this.showExtensionsPopup ? html`
      <div class="popup-overlay" @click="${this.closeExtensionsPopup}">
        <div class="popup-content" @click="${e => e.stopPropagation()}">
          <h3>Extensiones</h3>
          <ul>
            ${this.currentExtensions.map(extension => html`
              <li>${extension.nombre}</li>
            `)}
          </ul>
          <button class="popup-close-button" @click="${this.closeExtensionsPopup}" aria-label="Cerrar popup">×</button>
        </div>
      </div>
    ` : ''}
    `;
  }

  handleSortChange(event) {
    this.sortBy = event.target.value;
  }

  async handleFilterChange(event) {
    this.filterPais = event.target.value;
    await this.loadCircuitos();
    await this.loadCountryList(this.getCurrentFiltersForCountry());
  }

  async handleDiasFilterChange(event) {
    const value = event.target.value;
    this.filterDias = value ? parseInt(value) : null;
    await this.loadCircuitos();
    await this.loadCountryList(this.getCurrentFiltersForCountry());
  }

  async handleTouroperadorFilterChange(event) {
    this.filterTouroperador = event.target.value;
    await this.loadCircuitos();
    await this.loadCountryList(this.getCurrentFiltersForCountry());
  }

  closeExtensionsPopup() {
    this.showExtensionsPopup = false;
    this.currentExtensions = [];
  }

  handleRowClick(circuito) {
    if (circuito.url) {
      window.open(circuito.url, '_blank');
    }
  }
}

customElements.define('page-circuits', PageCircuits);

import { LitElement, html, css } from 'lit';
import { ciudadService } from './ciudadService.js';
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
    errorCircuitos: { type: String }
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

  filterCiudades() {
    if (!this.searchTerm) {
      this.ciudadesFiltradas = [...this.ciudades];
    } else {
      this.ciudadesFiltradas = this.ciudades.filter(ciudad =>
        ciudad.nombre.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  async loadCircuitosForCiudad(ciudad) {
    this.loadingCircuitos = true;
    this.errorCircuitos = '';
    this.circuitos = [];
    try {
      const filtroDto = { nombreCiudad: ciudad.nombre, idCircuito: 0 };
      const response = await ciudadService.fetchCircuitos(filtroDto);
      this.circuitos = response.map(item => item.circuito);
    } catch (error) {
      this.errorCircuitos = 'Error al cargar circuitos para la ciudad.';
    } finally {
      this.loadingCircuitos = false;
    }
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
      </div>

      ${this.error ? html`
        <div class="error">
          ${this.error}
        </div>
      ` : ''}

      <div class="search-section">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Buscar ciudades..."
          @input="${this.handleSearch}"
        >
      </div>

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
                  <th>País</th>
                  <th>Días</th>
                  <th>Precio</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                ${this.circuitos.map(circuito => html`
                  <tr>
                    <td>${circuito.nombre}</td>
                    <td>${circuito.pais}</td>
                    <td>${circuito.dias}</td>
                    <td>
                      ${circuito.precio?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) ?? 'N/A'}
                    </td>
                    <td>
                      ${circuito.url ? html`<a href="${circuito.url}" target="_blank" rel="noopener noreferrer">🔗</a>` : ''}
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
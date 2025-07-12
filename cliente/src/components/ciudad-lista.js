import { LitElement, html, css } from 'lit';
import { ciudadService } from '../services/ciudadService.js';

export class PageCities extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    h1 {
      color: #2196F3;
      margin: 0;
    }

    .loading {
      text-align: center;
      padding: 3rem;
      color: #666;
    }

    .error {
      background: #ffebee;
      color: #c62828;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .search-section {
      margin-bottom: 2rem;
    }

    .search-input {
      width: 100%;
      max-width: 400px;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .search-input:focus {
      outline: none;
      border-color: #2196F3;
      box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
    }

    .cities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .city-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .city-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border-color: #2196F3;
    }

    .city-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .city-name {
      font-size: 1.1rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .city-id {
      color: #666;
      font-size: 0.9rem;
    }

    .no-cities {
      text-align: center;
      color: #666;
      font-style: italic;
      grid-column: 1 / -1;
      padding: 3rem;
    }

    .refresh-button {
      background: #4CAF50;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .refresh-button:hover {
      background: #45a049;
    }

    .stats {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 2rem;
      text-align: center;
    }

    .stats-number {
      font-size: 2rem;
      font-weight: bold;
      color: #2196F3;
    }

    .stats-label {
      color: #666;
      font-size: 0.9rem;
    }
  `;

  static properties = {
    ciudades: { type: Array },
    ciudadesFiltradas: { type: Array },
    loading: { type: Boolean },
    error: { type: String },
    searchTerm: { type: String }
  };

  constructor() {
    super();
    this.ciudades = [];
    this.ciudadesFiltradas = [];
    this.loading = false;
    this.error = '';
    this.searchTerm = '';
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

  handleCityClick(ciudad) {
    // Enviar evento para navegar a la página de búsqueda con la ciudad seleccionada
    this.dispatchEvent(new CustomEvent('city-selected', {
      detail: { ciudad },
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
        <h1>Ciudades Disponibles</h1>
        <button class="refresh-button" @click="${this.loadCiudades}">
          Actualizar
        </button>
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

      <div class="cities-grid">
        ${this.ciudadesFiltradas.length > 0 ? 
          this.ciudadesFiltradas.map(ciudad => html`
            <div class="city-card" @click="${() => this.handleCityClick(ciudad)}">
              <div class="city-icon">🏙️</div>
              <div class="city-name">${ciudad.nombre}</div>
              <div class="city-id">ID: ${ciudad.id}</div>
            </div>
          `) : 
          html`
            <div class="no-cities">
              No se encontraron ciudades con el término de búsqueda.
            </div>
          `
        }
      </div>
    `;
  }
}

customElements.define('page-cities', PageCities);
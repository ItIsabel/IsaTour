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
    filterTouroperador: { type: String }
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
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadCircuitos();
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
      this.circuitos = await circuitoService.getCircuitos(filters);
    } catch (error) {
      this.error = 'Error al cargar los circuitos. Por favor, intenta de nuevo.';
      console.error('Error loading circuits:', error);
    } finally {
      this.loading = false;
    }
  }

  async loadExtensiones(circuitoId) {
    try {
      this.loadingExtensions = { ...this.loadingExtensions, [circuitoId]: true };
      this.requestUpdate();

      const extensiones = await circuitoService.getExtensiones(circuitoId);

      this.currentExtensions = extensiones;
      this.showExtensionsPopup = true;
      this.requestUpdate();

      // Optionally store extensions in circuito object
      this.circuitos = this.circuitos.map(circuito => {
        if (circuito.id === circuitoId) {
          return { ...circuito, extensiones };
        }
        return circuito;
      });
    } catch (error) {
      console.error('Error loading extensions:', error);
    } finally {
      this.loadingExtensions = { ...this.loadingExtensions, [circuitoId]: false };
      this.requestUpdate();
    }
  }

  closeExtensionsPopup() {
    this.showExtensionsPopup = false;
    this.currentExtensions = [];
  }
  render() {
    if (this.loading) {
      return html`
        <div class="loading">
          <p>Cargando circuitos...</p>
        </div>
      `;
    }

    let filteredCircuitos = this.circuitos;
    if (this.filterPais) {
      filteredCircuitos = filteredCircuitos.filter(circuito => circuito.pais === this.filterPais);
    }
    if (this.filterDias !== null) {
      filteredCircuitos = filteredCircuitos.filter(circuito => circuito.dias === this.filterDias);
    }
    if (this.filterTouroperador) {
      filteredCircuitos = filteredCircuitos.filter(circuito => circuito.touroperador === this.filterTouroperador);
    }

    const sortedCircuitos = [...filteredCircuitos];
    if (this.sortBy === 'precio') {
      sortedCircuitos.sort((a, b) => this.sortOrder === 'asc' ? a.precio - b.precio : b.precio - a.precio);
    } else if (this.sortBy === 'duracion') {
      sortedCircuitos.sort((a, b) => this.sortOrder === 'asc' ? a.dias - b.dias : b.dias - a.dias);
    }

    // Get unique countries for filter dropdown
    const uniquePaises = [...new Set(this.circuitos.map(circuito => circuito.pais))].sort();

    return html`
      <div class="header">
        <h1>Circuitos Disponibles</h1>
        <div class="filters-container">
          <div class="filter-item">
            <label for="pais-filter">Filtrar por País:</label>
            <select id="pais-filter" @change="${this.handleFilterChange}">
              <option value="">-- Todos --</option>
              ${uniquePaises.map(pais => html`
                <option value="${pais}" ?selected="${this.filterPais === pais}">${pais}</option>
              `)}
            </select>
          </div>

          <div class="filter-item">
            <label for="dias-filter">Filtrar por Días:</label>
            <select id="dias-filter" @change="${this.handleDiasFilterChange}">
              <option value="">-- Todos --</option>
              ${[...new Set(this.circuitos.map(circuito => circuito.dias))].sort().map(dias => html`
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
            <th>Nombre</th>
            <th>País</th>
            <th @click="${() => this.toggleSort('duracion')}" style="cursor:pointer;">
              Duración
              ${this.sortBy === 'duracion' ? (this.sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th @click="${() => this.toggleSort('precio')}" style="cursor:pointer;">
              Precio
              ${this.sortBy === 'precio' ? (this.sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          ${sortedCircuitos.map(circuito => html`
            <tr>
              <td>${circuito.nombre}</td>
              <td>${circuito.pais}</td>
              <td>${circuito.dias} días</td>
              <td>${circuito.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
              <td>
                ${circuito.url ? html`
                  <a href="${circuito.url}" target="_blank" rel="noopener noreferrer" title="Ver más información">🔗</a>
                ` : ''}
              </td>
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

  toggleSort(column) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
  }

  handleFilterChange(event) {
    this.filterPais = event.target.value;
  }

  handleDiasFilterChange(event) {
    const value = event.target.value;
    this.filterDias = value ? parseInt(value) : null;
    this.loadCircuitos();
  }

  handleTouroperadorFilterChange(event) {
    this.filterTouroperador = event.target.value;
    this.loadCircuitos();
  }

  closeExtensionsPopup() {
    this.showExtensionsPopup = false;
    this.currentExtensions = [];
  }


}

customElements.define('page-circuits', PageCircuits);

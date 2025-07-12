import { LitElement, html, css } from 'lit';
import { circuitoService } from '../services/circuitoService.js';

export class PageCircuits extends LitElement {

  static properties = {
    circuitos: { type: Array },
    loading: { type: Boolean },
    error: { type: String },
    loadingExtensions: { type: Object },
    sortBy: { type: String },
    sortOrder: { type: String },
    filterPais: { type: String }
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
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadCircuitos();
  }

  async loadCircuitos() {
    try {
      this.loading = true;
      this.error = '';
      this.circuitos = await circuitoService.getCircuitos();
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
      
      // Actualizar el circuito con las extensiones
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
        <button class="refresh-button" @click="${this.loadCircuitos}">
          Actualizar
        </button>
        <label for="pais-filter">Filtrar por País:</label>
        <select id="pais-filter" @change="${this.handleFilterChange}">
          <option value="">-- Todos --</option>
          ${uniquePaises.map(pais => html`
            <option value="${pais}" ?selected="${this.filterPais === pais}">${pais}</option>
          `)}
        </select>
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
            <th>Extensiones</th>
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
              <td>
                <button 
                  @click="${() => this.loadExtensiones(circuito.id)}"
                  ?disabled="${this.loadingExtensions[circuito.id]}"
                >
                  ${this.loadingExtensions[circuito.id] ? 'Cargando...' : 'Ver Extensiones'}
                </button>
                ${circuito.extensiones && circuito.extensiones.length > 0 ? html`
                  <ul>
                    ${circuito.extensiones.map(extension => html`
                      <li>${extension.nombre}</li>
                    `)}
                  </ul>
                ` : circuito.extensiones ? html`
                  <div>No hay extensiones disponibles para este circuito.</div>
                ` : ''}
              </td>
            </tr>
          `)}
        </tbody>
      </table>
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

  toggleSort(column) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
  }
}

customElements.define('page-circuits', PageCircuits);
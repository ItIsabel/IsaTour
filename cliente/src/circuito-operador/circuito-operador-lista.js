import { LitElement, html } from 'lit';
import { circuitoService } from '../circuito/circuitoService.js';
import './circuito-create-edit/create-dialog.js';
import { Styles } from '../circuito/circuito-lista-styles.js';

export class PageCircuitsOperador extends LitElement {
  static styles = Styles;

  static properties = {
    circuitos: { type: Array },
    filteredCircuitos: { type: Array },
    loading: { type: Boolean },
    error: { type: String },
    touroperador: { type: String },
    filterText: { type: String },
    sortBy: { type: String },
    sortOrder: { type: String }
  };

  constructor() {
    super();
    this.circuitos = [];
    this.filteredCircuitos = [];
    this.loading = false;
    this.error = '';
    this.touroperador = '';
    this.filterText = '';
    this.sortBy = '';
    this.sortOrder = 'asc';
  }

  async connectedCallback() {
    super.connectedCallback();
    // Get touroperador from localStorage
    this.touroperador = localStorage.getItem('tourOperador');
    await this.loadCircuitos();
  }

  async loadCircuitos() {
    try {
      this.loading = true;
      this.error = '';

      // Get auth token
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      // Load circuits for this touroperador
      const circuitos = await circuitoService.getCircuitosOperador(this.touroperador, token);
      this.circuitos = circuitos;

    } catch (error) {
      if (error.message.includes('401') || error.message.includes('403')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tourOperador');
        window.location.href = '/login';
        return;
      }
      this.error = 'Error al cargar los circuitos. Por favor, intenta de nuevo.';
      console.error('Error loading circuits:', error);
    } finally {
      this.loading = false;
    }
  }

  handleFilterChange(e) {
    this.filterText = e.target.value.toLowerCase();
    this.filteredCircuitos = this.circuitos.filter(circuito =>
      circuito.nombre.toLowerCase().includes(this.filterText)
    );
    this.requestUpdate();
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

  openCreateDialog() {
    if (!this.createDialog) {
      this.createDialog = this.renderRoot.querySelector('create-dialog');
    }
    this.createDialog.openDialog(null, this.touroperador);
  }

  openEditDialog(circuito) {
    if (!this.createDialog) {
      this.createDialog = this.renderRoot.querySelector('create-dialog');
    }
    this.createDialog.openDialog(circuito, this.touroperador);
  }

  handleCircuitoCreated() {
    this.loadCircuitos();
  }

  handleCircuitoUpdated() {
    this.loadCircuitos();
  }

  async handleDeleteCircuito(circuitoId) {
    if (!confirm('¿Estás seguro de que quieres eliminar este circuito?')) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      await circuitoService.deleteCircuito(this.touroperador, circuitoId, token);
+     window.location.reload();
    } catch (error) {
      this.error = 'Error al eliminar el circuito.';
      console.error('Error deleting circuito:', error);
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

    return html`
      <div class="header">
        <h1>Mis Circuitos</h1>
        </div>
      </div>

      <div class="filters-container">
        <div class="filter-item filter-left">
          <label for="filter-text">Buscar circuito por nombre:</label>
          <input
            type="text"
            id="filter-text"
            placeholder="Escribe para filtrar..."
            @input="${this.handleFilterChange}"
            class="filter-input"
          >
        </div>
        <div class="filter-item filter-right">
          <button class="btn-edit" @click="${this.openCreateDialog}">
            Nuevo Circuito
          </button>
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
            <th @click="${() => this.toggleSort('duracion')}" style="cursor:pointer;">
              Duración
              ${this.sortBy === 'duracion' ? (this.sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th @click="${() => this.toggleSort('precio')}" style="cursor:pointer;">
              Precio
              ${this.sortBy === 'precio' ? (this.sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${(this.filterText ? this.filteredCircuitos : this.circuitos).map(circuito => html`
            <tr @click="${() => circuito.url && window.open(circuito.url, '_blank')}" style="${circuito.url ? 'cursor: pointer;' : ''}">
              <td>${circuito.nombre.charAt(0).toUpperCase() + circuito.nombre.slice(1).toLowerCase()}</td>
              <td>${circuito.dias} días</td>
              <td>${circuito.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
              <td>
                <button class="btn-edit" @click="${(e) => { e.stopPropagation(); this.openEditDialog(circuito); }}">Editar</button>
                <button class="btn-delete" @click="${(e) => { e.stopPropagation(); this.handleDeleteCircuito(circuito.id); }}">Eliminar</button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>

      <create-dialog
        @circuito-created="${this.handleCircuitoCreated}"
        @circuito-updated="${this.handleCircuitoUpdated}"
      ></create-dialog>
    `;
  }


}

customElements.define('page-circuits-operador', PageCircuitsOperador);

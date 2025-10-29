import { LitElement, html } from 'lit';
import { circuitoService } from '../../circuito/circuitoService.js';
import { ciudadService } from '../../ciudad/ciudadService.js';
import { CiudadSelector } from './ciudad-selector.js';
import { MesSelector } from './mes-selector.js';
import { Styles } from '../../circuito/circuito-lista-styles.js';
import { CreateDialogStyles } from './create-dialog-styles.js';

export class CreateDialog extends LitElement {
  static styles = [Styles, CreateDialogStyles];

  static properties = {
    showDialog: { type: Boolean },
    editingCircuito: { type: Object },
    touroperador: { type: String },
    formData: { type: Object },
    selectedCiudades: { type: Array },
    selectedMeses: { type: Array },
    formErrors: { type: Object }
  };

  constructor() {
    super();
    this.showDialog = false;
    this.editingCircuito = null;
    this.touroperador = '';
    this.formData = {
      nombre: '',
      dias: '',
      precio: '',
      url: ''
    };
    this.selectedCiudades = [];
    this.selectedMeses = [];
    this.formErrors = {};
  }

  async openDialog(editingCircuito = null, touroperador = '') {
    console.log('openDialog called with:', { editingCircuito, touroperador });
    this.editingCircuito = editingCircuito;
    this.touroperador = touroperador;

    if (editingCircuito) {
      await this.loadCircuitoData(editingCircuito);
    } else {
      this.resetForm();
    }

    this.showDialog = true;

    // Wait for render to complete and ensure element is in document before showing modal
    this.updateComplete.then(() => {
      const dialog = this.renderRoot.querySelector('dialog.create-dialog');
      if (dialog && !dialog.open && dialog.isConnected) {
        dialog.showModal();
      } else if (dialog && !dialog.open) {
        // If not connected yet, wait a bit more
        setTimeout(() => {
          if (dialog && !dialog.open && dialog.isConnected) {
            dialog.showModal();
          }
        }, 10);
      }
    });
  }

  closeDialog() {
    const dialog = this.renderRoot.querySelector('dialog.create-dialog');
    
    if (dialog && dialog.open) {
      dialog.close();
    }
    
    this.showDialog = false;
    this.editingCircuito = null;
    this.resetForm();
  }

  firstUpdated() {
    // Add close on backdrop click
    const dialog = this.renderRoot.querySelector('dialog.create-dialog');
    if (dialog) {
      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          this.closeDialog();
        }
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const dialog = this.renderRoot.querySelector('dialog.create-dialog');
    if (dialog && dialog.open) {
      dialog.close();
    }
  }

  resetForm() {
    this.formData = {
      nombre: '',
      dias: '',
      precio: '',
      url: ''
    };
    this.selectedCiudades = [];
    this.selectedMeses = [];
    this.formErrors = {};
  }

  async loadCircuitoData(circuito) {
    this.formData = {
      nombre: circuito.nombre || '',
      dias: circuito.dias || '',
      precio: circuito.precio || '',
      url: circuito.url || ''
    };

    // Load circuit cities
    try {
      const token = localStorage.getItem('authToken');
      const touroperador = localStorage.getItem('tourOperador');
      const ciudades = await circuitoService.getCiudadesByCircuito(touroperador, circuito.id, token);
      this.selectedCiudades = ciudades;
    } catch (error) {
      console.error('Error loading circuit cities:', error);
      this.selectedCiudades = [];
    }

    // Load circuit months
    try {
      const token = localStorage.getItem('authToken');
      const meses = await circuitoService.getMesesByCircuito(circuito.id, token);
      this.selectedMeses = meses;
    } catch (error) {
      console.error('Error loading circuit months:', error);
      this.selectedMeses = [];
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.formData = { ...this.formData, [name]: value };
    if (this.formErrors[name]) {
      this.formErrors = { ...this.formErrors, [name]: '' };
    }
  }

  handleCiudadesChange(e) {
    this.selectedCiudades = e.detail.selectedCiudades;
    if (this.formErrors.ciudades) {
      this.formErrors = { ...this.formErrors, ciudades: '' };
    }
  }

  handleMesesChange(e) {
    this.selectedMeses = e.detail.selectedMeses;
    if (this.formErrors.meses) {
      this.formErrors = { ...this.formErrors, meses: '' };
    }
  }

  validateForm() {
    const errors = {};

    if (!this.formData.nombre.trim()) {
      errors.nombre = 'El nombre es obligatorio';
    }

    if (!this.formData.dias || this.formData.dias < 1) {
      errors.dias = 'Los días deben ser mayor que 0';
    }

    if (!this.formData.precio || this.formData.precio < 0) {
      errors.precio = 'El precio debe ser mayor o igual a 0';
    }

    if (this.selectedCiudades.length === 0) {
      errors.ciudades = 'Debe seleccionar al menos una ciudad';
    }

    if (this.selectedMeses.length === 0) {
      errors.meses = 'Debe seleccionar al menos un mes';
    }

    this.formErrors = errors;
    return Object.keys(errors).length === 0;
  }

  get isFormValid() {
    return this.validateForm();
  }

  async handleCreateCircuito(e) {
    console.log('handleCreateCircuito called');
    e.preventDefault();

    if (!this.validateForm()) {
      console.log('Form validation failed');
      this.requestUpdate();
      return;
    }

    console.log('Form validation passed, proceeding with creation');

    try {
      const token = localStorage.getItem('authToken');
      const circuitoData = {
        tour: {
          nombre: this.formData.nombre,
          dias: parseInt(this.formData.dias),
          precio: parseFloat(this.formData.precio),
          url: this.formData.url
        },
        ciudades: this.selectedCiudades.map(c => c.id),
        meses: this.selectedMeses
      };

      console.log('Sending circuito data:', circuitoData);
      await circuitoService.createCircuito(this.touroperador, circuitoData, token);
      this.dispatchEvent(new CustomEvent('circuito-created'));
      this.closeDialog();
      window.location.reload();
    } catch (error) {
      if (error.message.includes('400')) {
        this.formErrors.general = 'Error en los datos. Verifica que el nombre no esté duplicado.';
      } else if (error.message.includes('500')) {
        this.formErrors.general = 'Error interno del servidor. Inténtalo de nuevo más tarde.';
      } else {
        this.formErrors.general = `Error al crear el circuito: ${error.message}`;
      }
      console.error('Error creating circuito:', error);
      this.requestUpdate();
    }
  }

  async handleEditCircuito(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      this.requestUpdate();
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const circuitoData = {
        tour: {
          nombre: this.formData.nombre,
          dias: parseInt(this.formData.dias),
          precio: parseFloat(this.formData.precio),
          url: this.formData.url
        },
        ciudades: this.selectedCiudades.map(c => c.id),
        meses: this.selectedMeses
      };

      await circuitoService.updateCircuito(this.touroperador, this.editingCircuito.id, circuitoData, token);
      this.dispatchEvent(new CustomEvent('circuito-updated'));
      this.closeDialog();
      window.location.reload();
    } catch (error) {
      if (error.message.includes('400')) {
        this.formErrors.general = 'Error en los datos. Verifica que el nombre no esté duplicado.';
      } else {
        this.formErrors.general = 'Error al actualizar el circuito. Inténtalo de nuevo.';
      }
      console.error('Error updating circuito:', error);
      this.requestUpdate();
    }
  }

  render() {
    if (!this.showDialog) {
      return html``;
    }

    return html`
      <dialog class="create-dialog">
        <div class="dialog-content">
          <h2>${this.editingCircuito ? 'Editar Circuito' : 'Crear Nuevo Circuito'}</h2>
          <button class="popup-close-button" @click="${this.closeDialog}" aria-label="Cerrar popup">×</button>

          ${this.formErrors.general ? html`
            <div class="error">${this.formErrors.general}</div>
          ` : ''}

          <form novalidate @submit="${this.editingCircuito ? this.handleEditCircuito : this.handleCreateCircuito}">
            <div class="form-section">
              <h3>Datos Básicos</h3>
              <div class="form-group">
                <label for="nombre">Nombre del circuito *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  .value="${this.formData.nombre}"
                  @input="${this.handleInputChange}"
                >
                ${this.formErrors.nombre ? html`<div class="field-error">${this.formErrors.nombre}</div>` : ''}
              </div>

              <div class="form-group">
                <label for="url">URL de información</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  .value="${this.formData.url}"
                  @input="${this.handleInputChange}"
                  placeholder="https://ejemplo.com"
                >
              </div>

              <div class="form-group">
                <label for="dias">Días *</label>
                <input
                  type="number"
                  id="dias"
                  name="dias"
                  min="1"
                  .value="${this.formData.dias}"
                  @input="${this.handleInputChange}"
                >
                ${this.formErrors.dias ? html`<div class="field-error">${this.formErrors.dias}</div>` : ''}
              </div>

              <div class="form-group">
                <label for="precio">Precio (€) *</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  min="0"
                  step="0.01"
                  .value="${this.formData.precio}"
                  @input="${this.handleInputChange}"
                >
                ${this.formErrors.precio ? html`<div class="field-error">${this.formErrors.precio}</div>` : ''}
              </div>
            </div>

            <div class="form-section">
              <h3>Ciudades del Circuito</h3>
              <ciudad-selector
                .selectedCiudades="${this.selectedCiudades}"
                @ciudades-changed="${this.handleCiudadesChange}"
              ></ciudad-selector>
              ${this.formErrors.ciudades ? html`<div class="field-error">${this.formErrors.ciudades}</div>` : ''}
            </div>

            <div class="form-section">
              <h3>Meses de Operación</h3>
              <mes-selector
                .selectedMeses="${this.selectedMeses}"
                @meses-changed="${this.handleMesesChange}"
              ></mes-selector>
              ${this.formErrors.meses ? html`<div class="field-error">${this.formErrors.meses}</div>` : ''}
            </div>

            <div class="form-actions">
              <button type="button" @click="${this.closeDialog}" class="btn-cancel">Cancelar</button>
              <button type="submit" class="btn-save" formnovalidate ?disabled="${!this.isFormValid}">${this.editingCircuito ? 'Actualizar Circuito' : 'Crear Circuito'}</button>
            </div>
          </form>
        </div>
      </dialog>
    `;
  }
}

customElements.define('create-dialog', CreateDialog);
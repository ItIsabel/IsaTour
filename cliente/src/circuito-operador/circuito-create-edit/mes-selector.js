import { LitElement, html } from 'lit';
import { MesSelectorStyles } from './mes-selector-styles.js';

export class MesSelector extends LitElement {
  static styles = MesSelectorStyles;
  static properties = {
    selectedMeses: { type: Array },
    error: { type: String }
  };

  constructor() {
    super();
    this.selectedMeses = [];
    this.error = '';
  }

  get meses() {
    return [
      { numero: 1, nombre: 'Enero' },
      { numero: 2, nombre: 'Febrero' },
      { numero: 3, nombre: 'Marzo' },
      { numero: 4, nombre: 'Abril' },
      { numero: 5, nombre: 'Mayo' },
      { numero: 6, nombre: 'Junio' },
      { numero: 7, nombre: 'Julio' },
      { numero: 8, nombre: 'Agosto' },
      { numero: 9, nombre: 'Septiembre' },
      { numero: 10, nombre: 'Octubre' },
      { numero: 11, nombre: 'Noviembre' },
      { numero: 12, nombre: 'Diciembre' }
    ];
  }

  handleMesChange(e) {
    const mesNumero = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      if (!this.selectedMeses.includes(mesNumero)) {
        this.selectedMeses = [...this.selectedMeses, mesNumero].sort((a, b) => a - b);
      }
    } else {
      this.selectedMeses = this.selectedMeses.filter(mes => mes !== mesNumero);
    }

    this.error = '';
    this.dispatchEvent(new CustomEvent('meses-changed', {
      detail: { selectedMeses: this.selectedMeses },
      bubbles: true,
      composed: true
    }));
  }

  validate() {
    if (this.selectedMeses.length === 0) {
      this.error = 'Debe seleccionar al menos un mes';
      return false;
    }
    this.error = '';
    return true;
  }

  render() {
    return html`
      <div class="mes-selector">
        <label>Meses de operación del circuito</label>

        <div class="stats">
          ${this.selectedMeses.length} meses seleccionados
        </div>

        <div class="meses-grid">
          ${this.meses.map(mes => html`
            <div class="mes-checkbox">
              <input
                type="checkbox"
                id="mes-${mes.numero}"
                value="${mes.numero}"
                .checked="${this.selectedMeses.includes(mes.numero)}"
                @change="${this.handleMesChange}"
              >
              <label for="mes-${mes.numero}">${mes.nombre}</label>
            </div>
          `)}
        </div>

        ${this.selectedMeses.length > 0 ? html`
          <div class="selected-meses">
            ${this.selectedMeses.map(mesNumero => {
              const mes = this.meses.find(m => m.numero === mesNumero);
              return html`<span class="mes-tag">${mes.nombre}</span>`;
            })}
          </div>
        ` : ''}

        ${this.error ? html`
          <div class="error">${this.error}</div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('mes-selector', MesSelector);

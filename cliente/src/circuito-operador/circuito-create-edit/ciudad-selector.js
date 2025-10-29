import { LitElement, html } from 'lit';
import { ciudadService } from '../../ciudad/ciudadService.js';
import { CiudadSelectorStyles } from './ciudad-selector-styles.js';

export class CiudadSelector extends LitElement {
  static styles = CiudadSelectorStyles;
  static properties = {
    selectedCiudades: { type: Array },
    ciudades: { type: Array },
    loading: { type: Boolean },
    error: { type: String },
    filterText: { type: String },
    showDropdown: { type: Boolean },
    filterCountry: { type: String },
    countryList: { type: Array }
  };

  constructor() {
    super();
    this.selectedCiudades = [];
    this.ciudades = [];
    this.loading = false;
    this.error = '';
    this.filterText = '';
    this.showDropdown = false;
    this.filterCountry = '';
    this.countryList = [];
    this.debounceTimer = null;
    this.maxDropdownItems = 10;
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
      // Generate country list from cities data
      this.countryList = [...new Set(this.ciudades.map(ciudad => ciudad.pais))].filter(pais => pais != null).sort();
    } catch (error) {
      this.error = 'Error al cargar ciudades';
      console.error('Error loading cities:', error);
    } finally {
      this.loading = false;
    }
  }

  get filteredCiudades() {
    let filtered = this.ciudades;

    // Apply country filter first
    if (this.filterCountry) {
      filtered = filtered.filter(ciudad => ciudad.pais === this.filterCountry);
    }

    // Apply text filter
    if (this.filterText) {
      const filter = this.filterText.toLowerCase();
      filtered = filtered.filter(ciudad =>
        ciudad.nombre.toLowerCase().startsWith(filter)
      );
    }

    return filtered;
  }

  get availableCiudades() {
    const filtered = this.filteredCiudades.filter(ciudad =>
      !this.selectedCiudades.some(selected => selected.id === ciudad.id)
    );
    return filtered.slice(0, this.maxDropdownItems);
  }

  handleFilterInput(e) {
    const value = e.target.value;
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      this.filterText = value;
      this.showDropdown = true;
      this.requestUpdate();
    }, 300); // Increased debounce time
  }

  handleFilterFocus() {
    this.showDropdown = true;
  }

  handleFilterBlur() {
    // Delay hiding dropdown to allow click on options
    setTimeout(() => {
      this.showDropdown = false;
      this.requestUpdate();
    }, 150);
  }

  selectCiudad(ciudad) {
    if (!this.selectedCiudades.some(selected => selected.id === ciudad.id)) {
      this.selectedCiudades = [...this.selectedCiudades, ciudad];
      this.filterText = '';
      this.showDropdown = false;
      this.dispatchEvent(new CustomEvent('ciudades-changed', {
        detail: { selectedCiudades: this.selectedCiudades },
        bubbles: true,
        composed: true
      }));
    }
  }

  removeCiudad(ciudadId) {
    this.selectedCiudades = this.selectedCiudades.filter(ciudad => ciudad.id !== ciudadId);
    this.dispatchEvent(new CustomEvent('ciudades-changed', {
      detail: { selectedCiudades: this.selectedCiudades },
      bubbles: true,
      composed: true
    }));
  }

  handleCountryFilterChange(e) {
    this.filterCountry = e.target.value;
    this.requestUpdate();
  }

  shouldUpdate(changedProperties) {
    // Only update if relevant properties changed
    return changedProperties.has('selectedCiudades') ||
           changedProperties.has('ciudades') ||
           changedProperties.has('loading') ||
           changedProperties.has('error') ||
           changedProperties.has('filterText') ||
           changedProperties.has('showDropdown') ||
           changedProperties.has('filterCountry') ||
           changedProperties.has('countryList');
  }

  render() {
    return html`
      <div class="ciudad-selector">
        <label>Ciudades del circuito</label>

        <div class="selected-ciudades">
          ${this.selectedCiudades.map(ciudad => html`
            <span class="ciudad-tag">
              ${ciudad.nombre}, ${ciudad.pais}
              <button @click="${() => this.removeCiudad(ciudad.id)}" title="Remover ciudad">×</button>
            </span>
          `)}
        </div>

        <div class="filter-container">
          <div class="filter-row">
            <input
              type="text"
              class="filter-input"
              placeholder="Buscar ciudades por nombre..."
              .value="${this.filterText}"
              @input="${this.handleFilterInput}"
              @focus="${this.handleFilterFocus}"
              @blur="${this.handleFilterBlur}"
            >

            <select @change="${this.handleCountryFilterChange}">
              <option value="">-- Todos los países --</option>
              ${this.countryList.map(pais => html`
                <option value="${pais}" ?selected="${this.filterCountry === pais}">${pais}</option>
              `)}
            </select>
          </div>

          ${this.showDropdown ? html`
            <div class="dropdown">
              ${this.loading ? html`
                <div class="loading">Cargando ciudades...</div>
              ` : this.availableCiudades.length > 0 ? html`
                ${this.availableCiudades.map(ciudad => html`
                  <div
                    class="dropdown-item"
                    @click="${() => this.selectCiudad(ciudad)}"
                  >
                    ${ciudad.nombre}, ${ciudad.pais}
                  </div>
                `)}
              ` : html`
                <div class="no-results">No se encontraron ciudades</div>
              `}
            </div>
          ` : ''}
        </div>

        <div class="stats">
          ${this.selectedCiudades.length} ciudades seleccionadas
        </div>

        ${this.error ? html`
          <div class="error">${this.error}</div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('ciudad-selector', CiudadSelector);

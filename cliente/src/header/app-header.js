
import { LitElement, html } from 'lit';
import { Styles } from './app-header-styles.js';

export class AppHeader extends LitElement {
  static styles = Styles;

  static properties = {
    currentPage: { type: String }
  };

  constructor() {
    super();
    this.currentPage = 'home';
    document.documentElement.classList.add('dark-mode');
  }

  render() {
    return html`
      <header class="header">
        <div class="header__container">
          <a href="#" class="header__logo" @click="${this._handleLogoClick}">
            Is<i>a</i> Tour
          </a>
          <nav class="header__nav">
            <button 
              class="header__button ${this.currentPage === 'circuitos' ? 'active' : ''}"
              @click="${() => this._navigateTo('circuitos')}"
            >
              LISTADO DE CIRCUITOS
            </button>
            <button 
              class="header__button ${this.currentPage === 'ciudades' ? 'active' : ''}"
              @click="${() => this._navigateTo('ciudades')}"
            >
              LISTADO DE CIUDADES
            </button>
          </nav>
        </div>
      </header>
    `;
  }

  _handleLogoClick(e) {
    e.preventDefault();
    document.documentElement.classList.toggle('dark-mode');
  }

  _navigateTo(page) {
    this.dispatchEvent(new CustomEvent('page-change', {
      detail: { page },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('app-header', AppHeader);

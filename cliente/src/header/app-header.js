
import { LitElement, html } from 'lit';
import { Styles } from './app-header-styles.js';

export class AppHeader extends LitElement {
  static styles = Styles;

  static properties = {
    currentPage: { type: String },
    isLoggedIn: { type: Boolean },
    tourOperador: { type: String }
  };

  constructor() {
    super();
    this.currentPage = 'home';
    this.isLoggedIn = false;
    this.tourOperador = '';
    document.documentElement.classList.add('dark-mode');
    this.checkAuthStatus();
  }

  connectedCallback() {
    super.connectedCallback();
    // Listen for auth changes
    window.addEventListener('auth-changed', this.checkAuthStatus.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('auth-changed', this.checkAuthStatus.bind(this));
  }

  checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    const tourOperador = localStorage.getItem('tourOperador');
    this.isLoggedIn = !!token;
    this.tourOperador = tourOperador || '';
    this.requestUpdate();
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
            ${this.isLoggedIn ? html`
              <button
                class="header__button ${this.currentPage === 'circuitos-operador' ? 'active' : ''}"
                @click="${() => this._navigateTo('circuitos-operador')}"
              >
                ${this.tourOperador}
              </button>
              <button
                class="header__button header__button--logout"
                @click="${this._logout}"
              >
                LOGOUT
              </button>
            ` : html`
              <button
                class="header__button ${this.currentPage === 'login' ? 'active' : ''}"
                @click="${() => this._navigateTo('login')}"
              >
                LOGIN
              </button>
            `}
            <button
              class="header__button ${this.currentPage === 'contacto' ? 'active' : ''}"
              @click="${() => this._navigateTo('contacto')}"
              style="margin-left: 1rem;"
            >
              CONTACTO
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

  _logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tourOperador');
    window.dispatchEvent(new CustomEvent('auth-changed'));
    this._navigateTo('circuitos');
  }
}

customElements.define('app-header', AppHeader);

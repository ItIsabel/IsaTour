
import { LitElement, html, css } from 'lit';

export class AppHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .header {
      background-color: transparent;
      font-family: 'Inter';
      letter-spacing: 3px;
    }

    .header__container {
      max-width: 1200px;
      padding: 1rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header__logo {
      font-size: 2.5rem;
      font-weight: 750;
      text-decoration: none;
      color: white;
      cursor: pointer;
    }

    .header__logo:hover {
      opacity: 0.8;
    }

    .header__nav {
      display: flex;
    }

    .header__button {
      padding: 8px 16px;
      text-decoration: none;
      background-color: transparent;
      color: #ffffff;
      font-weight: 700;
      font-size: 0.9rem;
      letter-spacing: 1.4px;
      border: none;
      font-family: 'Inter';
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .header__button:hover {
      text-decoration: underline;
      text-decoration-color: #ea5153;
      text-underline-offset: 0.8rem;
      text-decoration-thickness: 2px;
    }

    .header__button.active {
      text-decoration: underline;
      text-decoration-color: #ea5153;
      text-underline-offset: 0.8rem;
      text-decoration-thickness: 2px;
    }

    .header__mobile-toggle {
      background-color: transparent;
      color: #ffffff;
      border: none;
      font-size: x-large;
      font-weight: 800;
      min-width: 3em;
    }
  `;

  static properties = {
    currentPage: { type: String }
  };

  constructor() {
    super();
    this.currentPage = 'home';
  }

  render() {
    return html`
      <header class="header">
        <div class="header__container">
          <a href="#" class="header__logo" @click="${this._handleLogoClick}">
            CATAI
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
    this._navigateTo('circuitos');
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
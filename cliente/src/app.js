import { LitElement, html, css } from 'lit';
import './header/app-header.js';
import './ciudad/ciudad-lista.js';
import './contacto/contacto-page.js';

export class MyApp extends LitElement {
    static styles = css`
        :host {
            display: block;
            min-height: 100vh;
            font-family: 'Inter';
        }

        main {
            min-height: calc(100vh - 80px);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding-top: 2rem;
        }
    `;

    static properties = {
        currentView: { type: String }
    };

    constructor() {
        super();
        this.currentView = 'circuitos';
    }

    firstUpdated() {
        // Alternativa: escuchar después de que el elemento esté renderizado
        this.addEventListener('page-change', this.handlePageChange);
    }

    handlePageChange = (e) => {
        const { page } = e.detail;
        
        switch(page) {
            case 'circuitos':
                this.currentView = 'circuitos';
                break;
            case 'ciudades':
                this.currentView = 'ciudades';
                break;
            case 'contacto':
                this.currentView = 'contacto';
                break;
            default:
                this.currentView = 'circuitos';
        }
    }

    // Método alternativo: manejar directamente desde el template
    handleNavigation = (page) => {
        switch(page) {
            case 'circuitos':
                this.currentView = 'circuitos';
                break;
            case 'ciudades':
                this.currentView = 'ciudades';
                break;
            case 'contacto':
                this.currentView = 'contacto';
                break;
            default:
                this.currentView = 'circuitos';
        }
    }

    render() {
        return html`
            <app-header 
                .currentPage="${this.getCurrentPage()}"
                @page-change="${this.handlePageChange}"
            ></app-header>
            <main>
                ${this.renderCurrentView()}
            </main>
        `;
    }

    getCurrentPage() {
        switch(this.currentView) {
            case 'circuitos':
                return 'circuitos';
            case 'ciudades':
                return 'ciudades';
            case 'contacto':
                return 'contacto';
            default:
                return 'circuitos';
        }
    }

    renderCurrentView() {
        switch(this.currentView) {
            case 'circuitos':
                return html`<page-circuits></page-circuits>`;
            case 'ciudades':
                return html`<page-cities></page-cities>`;
            case 'contacto':
                return html`<contacto-page></contacto-page>`;
            default:
                return html`<page-circuits></page-circuits>`;
        }
    }
}

window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

customElements.define('my-app', MyApp);

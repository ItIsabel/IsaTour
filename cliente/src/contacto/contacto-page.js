import { LitElement, html } from 'lit';
import { Styles } from './contacto-page-styles.js';

export class ContactoPage extends LitElement {
  static styles = Styles;

  render() {
    return html`
      <div class="contacto-container">
        <h1>Contacto</h1>

        <div class="linkedin-link">
          <p>Encuentrame en LinkedIn:</p>
          <a href="https://www.linkedin.com/in/isabel-alvarez-1788801b9/" target="_blank" rel="noopener noreferrer">
            Visitar mi perfil de LinkedIn
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define('contacto-page', ContactoPage);

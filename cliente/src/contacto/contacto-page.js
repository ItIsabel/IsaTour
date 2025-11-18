import { LitElement, html } from 'lit';
import { Styles } from './contacto-page-styles.js';

export class ContactoPage extends LitElement {
  static styles = Styles;

  render() {
    return html`
      <div class="contacto-container">
        <h1>Encuéntranos en:</h1>

        <div class="social-links">
          <a href="https://www.linkedin.com/in/isabel-alvarez-1788801b9/" target="_blank" rel="noopener noreferrer">
            <img src="/media/linkedin.png" alt="LinkedIn" class="social-icon">
          </a>
          <a href="https://www.facebook.com/profile.php?id=61582469783037" target="_blank" rel="noopener noreferrer">
            <img src="/media/facebook.png" alt="Facebook" class="social-icon">
          </a>
          <a href="https://www.tiktok.com/@isatour.onrender.com" target="_blank" rel="noopener noreferrer">
            <img src="/media/tiktok.png" alt="TikTok" class="social-icon">
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define('contacto-page', ContactoPage);

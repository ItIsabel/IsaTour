import { LitElement, html } from 'lit';
import { Styles } from './contacto-page-styles.js';

export class ContactoPage extends LitElement {
  static styles = Styles;

  static properties = {
    nombre: { type: String },
    email: { type: String },
    mensaje: { type: String },
    asunto: { type: String }
  };

  constructor() {
    super();
    this.nombre = '';
    this.email = '';
    this.mensaje = '';
    this.asunto = 'Consulta desde formulario de contacto';
  }

  render() {
    return html`
      <div class="contacto-container">
        <h1>Contacto</h1>
        
        <form class="contacto-form" @submit="${this.handleSubmit}">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              .value="${this.nombre}"
              @input="${this.handleInput}"
              required
              placeholder="Tu nombre completo"
            >
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              .value="${this.email}"
              @input="${this.handleInput}"
              required
              placeholder="tu.email@ejemplo.com"
            >
          </div>

          <div class="form-group">
            <label for="asunto">Asunto:</label>
            <input 
              type="text" 
              id="asunto" 
              name="asunto" 
              .value="${this.asunto}"
              @input="${this.handleInput}"
              required
              placeholder="Asunto de tu consulta"
            >
          </div>

          <div class="form-group">
            <label for="mensaje">Mensaje:</label>
            <textarea 
              id="mensaje" 
              name="mensaje" 
              .value="${this.mensaje}"
              @input="${this.handleInput}"
              required
              rows="5"
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>

          <button type="submit" class="submit-button">Enviar Mensaje</button>
        </form>
      </div>
    `;
  }

  handleInput(e) {
    const { name, value } = e.target;
    this[name] = value;
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const emailBody = `
Nombre: ${this.nombre}
Email: ${this.email}
Asunto: ${this.asunto}

Mensaje:
${this.mensaje}
    `.trim();

    const email = import.meta.env.VITE_EMAIL_CONTACT;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(this.asunto)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    // Reset form
    this.nombre = '';
    this.email = '';
    this.mensaje = '';
    this.asunto = 'Consulta desde formulario de contacto';
    this.requestUpdate();
  }
}

customElements.define('contacto-page', ContactoPage);

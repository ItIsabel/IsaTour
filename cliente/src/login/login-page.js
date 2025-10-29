import { LitElement, html, css } from 'lit';

export class LoginPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', sans-serif;
    }

    .login-container {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .login-header h1 {
      color: #333;
      margin: 0;
      font-size: 2rem;
    }

    .login-header p {
      color: #666;
      margin: 0.5rem 0 0 0;
    }

    .register-link {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #666;
    }

    .register-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .register-link a:hover {
      text-decoration: underline;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e1e5e9;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      box-sizing: border-box;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
    }

    .login-button {
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .login-button:hover {
      transform: translateY(-2px);
    }

    .login-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .error-message {
      background: #fee;
      color: #c33;
      padding: 0.75rem;
      border-radius: 5px;
      margin-bottom: 1rem;
      border: 1px solid #fcc;
    }

    .loading {
      text-align: center;
      color: #666;
    }
  `;

  static properties = {
    loading: { type: Boolean },
    error: { type: String },
    isRegister: { type: Boolean }
  };

  constructor() {
    super();
    this.loading = false;
    this.error = '';
    this.isRegister = false;
  }

  render() {
    return html`
      <div class="login-container">
        <div class="login-header">
          <h1>Is<i style="color: #ff69b4;">a</i> Tour</h1>
          <p>${this.isRegister ? 'Regístrate para gestionar tus circuitos' : 'Inicia sesión para gestionar tus circuitos'}</p>
        </div>

        ${this.error ? html`
          <div class="error-message">
            ${this.error}
          </div>
        ` : ''}

        <form @submit="${this.handleSubmit}">
          ${this.isRegister ? html`
            <div class="form-group">
              <label for="name">Nombre de la Empresa</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autocomplete="organization"
              >
            </div>
          ` : ''}

          <div class="form-group">
            <label for="usr">Usuario</label>
            <input
              type="text"
              id="usr"
              name="usr"
              required
              autocomplete="username"
            >
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autocomplete="current-password"
            >
          </div>

          <button
            type="submit"
            class="login-button"
            ?disabled="${this.loading}"
          >
            ${this.loading ? (this.isRegister ? 'Registrando...' : 'Iniciando sesión...') : (this.isRegister ? 'Registrarse' : 'Iniciar Sesión')}
          </button>
        </form>

        <div class="register-link">
          ${this.isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'} <a href="#" @click="${this.toggleMode}">${this.isRegister ? 'Inicia sesión aquí' : 'Regístrate aquí'}</a>
        </div>
      </div>
    `;
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.loading = true;
    this.error = '';

    const formData = new FormData(e.target);

    if (this.isRegister) {
      // Verificar si hay un token válido antes de intentar registrar
      const token = localStorage.getItem('authToken');
      if (!token) {
        this.error = 'Debes iniciar sesión como administrador para registrar nuevos usuarios.';
        this.loading = false;
        return;
      }

      const registerData = {
        name: formData.get('name'),
        usr: formData.get('usr'),
        password: formData.get('password')
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(registerData)
        });

        const data = await response.json();

        if (response.ok) {
          this.error = 'Usuario registrado exitosamente. Ahora puedes iniciar sesión.';
          this.isRegister = false;
          this.requestUpdate();
        } else {
          this.error = data.error || 'Error al registrar usuario';
        }
      } catch (error) {
        console.error('Error during registration:', error);
        this.error = 'Error de conexión. Inténtalo de nuevo.';
      } finally {
        this.loading = false;
      }
    } else {
      const loginData = {
        usr: formData.get('usr'),
        password: formData.get('password')
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        });

        const data = await response.json();

      if (response.ok) {
        // Guardar token en localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('tourOperador', data.tourOperador);

        // Dispatch auth change event
        window.dispatchEvent(new CustomEvent('auth-changed'));

        // Redirigir usando el sistema de navegación de la app
        const event = new CustomEvent('page-change', {
          detail: { page: 'circuitos-operador' },
          bubbles: true,
          composed: true
        });
        document.dispatchEvent(event);

        // Cambiar la URL sin recargar la página
        window.history.pushState({}, '', data.redirectUrl);
      } else {
          this.error = data.error || 'Error al iniciar sesión';
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.error = 'Error de conexión. Inténtalo de nuevo.';
      } finally {
        this.loading = false;
      }
    }
  }

  toggleMode(e) {
    e.preventDefault();
    this.isRegister = !this.isRegister;
    this.error = '';
    this.requestUpdate();
  }
}

customElements.define('login-page', LoginPage);

import { LitElement, html, css } from 'lit';

export class RegisterPage extends LitElement {
  static properties = {
    errorMessage: { type: String },
    successMessage: { type: String }
  };

  constructor() {
    super();
    this.errorMessage = '';
    this.successMessage = '';
  }

  static styles = css`
    .container {
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      background-color: hsl(var(--background));
    }

    h1 {
      margin-bottom: 2rem;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      font-size: 0.875rem;
      transition: border-color 0.2s;
    }

    input:focus {
      outline: none;
      border-color: hsl(var(--primary));
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background-color: hsl(var(--primary));
      color: hsl(var(--primary-foreground));
      border: none;
      border-radius: var(--radius);
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    button:hover {
      opacity: 0.9;
    }

    .mensaje-error {
      color: red;
      margin-bottom: 1rem;
    }

    .mensaje-confirmacion {
      color: green;
      margin-bottom: 1rem;
    }
  `;

  render() {
    return html`
      <div class="container">
        <h1>Registro</h1>
        ${this.errorMessage ? html`<div class="mensaje-error">${this.errorMessage}</div>` : ''}
        ${this.successMessage ? html`<div class="mensaje-confirmacion">${this.successMessage}</div>` : ''}
        <form id="registro" @submit=${this._handleSubmit}>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" name="password" id="password" required>
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    `;
  }

  async _handleSubmit(e) {
    e.preventDefault();
    
    const email = this.shadowRoot.querySelector('#email').value;
    const password = this.shadowRoot.querySelector('#password').value;

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.errorMessage = 'Correo electrónico no válido';
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/usuarios/registro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Error en el registro');
      }

      if (data.tokens) {
        localStorage.setItem('authToken', data.tokens.access);
      }

      this.successMessage = 'Registro exitoso';
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      this.errorMessage = error.message;
      console.error('Error en el registro:', error);
    }
  }
}

customElements.define('register-page', RegisterPage);

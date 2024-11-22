import { LitElement, html, css } from 'lit';

export class RegisterPage extends LitElement {
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
  `;

  render() {
    return html`
      <div class="container">
        <h1>Registro</h1>
        <form @submit=${this._handleSubmit}>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" required>
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    `;
  }

  _handleSubmit(e) {
    e.preventDefault();
    // Aquí irá la lógica de registro
  }
}

customElements.define('register-page', RegisterPage);

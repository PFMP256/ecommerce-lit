import { LitElement, html, css } from 'lit';
import { router } from './router.js';
import './pages/home-page.js';
import './pages/register-page.js';

class MiEcommerce extends LitElement {
  static properties = {
    route: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    nav {
      display: flex;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid hsl(var(--border));
      margin-bottom: 2rem;
    }

    a {
      text-decoration: none;
      color: hsl(var(--foreground));
      padding: 0.5rem 1rem;
      border-radius: var(--radius);
      transition: background-color 0.2s;
    }

    a:hover {
      background-color: hsl(var(--secondary));
    }
  `;

  constructor() {
    super();
    router.init();
  }

  render() {
    return html`
      <nav>
        <a href="/" data-link>Inicio</a>
        <a href="/register" data-link>Registro</a>
      </nav>
      <main>
        ${router.handleLocation()}
      </main>
    `;
  }
}

customElements.define('mi-ecommerce', MiEcommerce);

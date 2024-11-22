import { LitElement, html } from 'lit';

export class HomePage extends LitElement {
  render() {
    return html`
      <div>
        <h1>Bienvenido a Mi Ecommerce</h1>
        <p>Encuentra los mejores productos aquí</p>
      </div>
    `;
  }
}

customElements.define('home-page', HomePage);

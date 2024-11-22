import { html } from 'lit';

export const router = {
  init() {
    window.addEventListener('popstate', () => this.handleLocation());
    window.addEventListener('load', () => this.handleLocation());
    
    document.addEventListener('click', e => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        this.navigateTo(e.target.href);
      }
    });
  },

  navigateTo(url) {
    window.history.pushState(null, null, url);
    this.handleLocation();
  },

  handleLocation() {
    const path = window.location.pathname;
    let page;

    switch (path) {
      case '/':
        page = html`<home-page></home-page>`;
        break;
      case '/register':
        page = html`<register-page></register-page>`;
        break;
      default:
        page = html`<h1>404 - Página no encontrada</h1>`;
    }

    return page;
  }
}; 
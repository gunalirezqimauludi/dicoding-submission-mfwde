import componentTemplateFactory from '../../utils/component-template-factory';
import css from './style.css';
import html from './template.html';

const template = componentTemplateFactory(html, css);

class AppBreadcrumb extends HTMLElement {
  set title(name) {
    this._title = name;
    this.render();
  }

  async render() {
    $('app-breadcrumb').html(template.content.cloneNode(true));
    $('app-breadcrumb').append(`
    <ol class="breadcrumb container">
      <li class="breadcrumb-item"><a href="index.html">Home</a></li>
      <li class="breadcrumb-item"><a href="#">Restaurant List</a></li>
      <li class="breadcrumb-item active">${this._title}</li>
    </ol>`);
  }
}

customElements.define('app-breadcrumb', AppBreadcrumb);

import componentTemplateFactory from '../../utils/component-template-factory';
import css from './style.css';
import html from './template.html';

const template = componentTemplateFactory(html, css);

class ShimmerCardRestaurant extends HTMLElement {
  connectedCallback() {
    $(this).html(template.content.cloneNode(true));
  }
}

customElements.define('shimmer-card-restaurant', ShimmerCardRestaurant);

import componentTemplateFactory from '../../utils/component-template-factory';
import css from './style.css';
import html from './template.html';

const template = componentTemplateFactory(html, css);

class HeroImage extends HTMLElement {
  connectedCallback() {
    $(this).html(template.content.cloneNode(true));

    this.title = this.getAttribute('title') || null;
    this.render();
  }

  render() {
    const today = new Date();
    const hour = today.getHours();

    if (hour < 12) {
      $('hero-image h1').html('Good Morning');
    } else if (hour < 18) {
      $('hero-image h1').html('Good Afternoon');
    } else {
      $('hero-image h1').html('Good Evening');
    }
    $('hero-image p').html(this.title);
  }
}

customElements.define('hero-image', HeroImage);

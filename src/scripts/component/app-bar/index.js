import componentTemplateFactory from '../../utils/component-template-factory';
import css from './style.css';
import html from './template.html';

const template = componentTemplateFactory(html, css);

class AppBar extends HTMLElement {
  connectedCallback() {
    $(this).html(template.content.cloneNode(true));

    $('.nav-menu > li > a').click((e) => {
      $('.nav-menu > li').removeClass('active');
      if (!$(e.target).closest('li').hasClass('active')) {
        $(e.target).closest('li').addClass('active');
      }
    });
  }
}

customElements.define('app-bar', AppBar);

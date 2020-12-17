import CONFIG from '../../globals/config';

import componentTemplateFactory from '../../utils/component-template-factory';
import css from './style.css';
import html from './template.html';

const template = componentTemplateFactory(html, css);

class CardRestaurant extends HTMLElement {
  set content(items) {
    this._items = items;
    this.render();
  }

  async render() {
    $('card-restaurant').html(template.content.cloneNode(true));

    const content = this._items.map((item) => `
    <a href="#/detail/${item.id}">
        <div class="main-card">
            <div class="col-image">
                <img class="lazyload" src="assets/images/loading.gif" data-src="${CONFIG.BASE_IMAGE_URL.MEDIUM}${item.pictureId}"
                    data-srcset="${CONFIG.BASE_IMAGE_URL.SMALL}${item.pictureId} 480w, ${CONFIG.BASE_IMAGE_URL.LARGE}${item.pictureId} 800w"
                    sizes="(max-width: 600px) 480px, 800px"
                    alt="${item.name}" crossorigin="anonymous"/>
            </div>
            <div class="col-info">
                <h1 class="title">${item.name}</h1>
                <div class="basic-info">
                    <div class="basic-info-col">
                        <i class="fa fa-star active" aria-hidden="true"></i>
                        <span>${item.rating}</span>
                    </div>
                    <div class="basic-info-col">
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <span>${item.city}</span>
                    </div>
                </div>
                <p class="additional-info">
                    ${item.description}
                </p>
            </div>
        </div>
    </a>`);

    $('card-restaurant').append(content);
  }
}

customElements.define('card-restaurant', CardRestaurant);

import CONFIG from '../../globals/config';

import componentTemplateFactory from '../../utils/component-template-factory';
import css from './style.css';
import html from './template.html';

const template = componentTemplateFactory(html, css);

class HeaderRestaurant extends HTMLElement {
  set content(data) {
    this._data = data;
    this.render();
  }

  async render() {
    $('header-restaurant').html(template.content.cloneNode(true));

    const {
      pictureId, name, categories, rating, city, description, address,
    } = this._data;

    $('header-restaurant').append(`
    <div class="restaurant-header">
        <div class="container">
            <div class="col-image">
                <img class="lazyload" src="assets/images/loading.gif" ="${CONFIG.BASE_IMAGE_URL.MEDIUM}${pictureId}"
                    data-srcset="${CONFIG.BASE_IMAGE_URL.SMALL}${pictureId} 480w, ${CONFIG.BASE_IMAGE_URL.LARGE}${pictureId} 800w"
                    sizes="(max-width: 600px) 480px, 800px"
                    alt="${name}" crossorigin="anonymous"/>
            </div>
            <div class="col-info">
                <h1>${name}</h1>
                <div class="categories-info">
                    <span>${categories[0].name}</span>
                    <span>Modern</span>
                </div>
                <div class="basic-info">
                    <div class="basic-info-col">
                        <i class="fa fa-star active" aria-hidden="true"></i>
                        <span>${rating}</span>
                    </div>
                    <div class="basic-info-col">
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <span>${city}</span>
                    </div>
                </div>
                <div class="description-info">
                    ${description}
                </div>
            </div>
            <div class="col-address-info">
                <h4>Address</h4>
                <p>${address}</p>
                <a href="https://www.google.com/maps/search/?api=1&query=${address}" target="_blank" rel="noopener">See map</a>
            </div>
        </div>
    </div>`);
  }
}

customElements.define('header-restaurant', HeaderRestaurant);

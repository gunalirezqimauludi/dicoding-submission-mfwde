import RestaurantMenu from '../../../public/data/menu-data.json';

import componentTemplateFactory from '../../utils/component-template-factory';
import css from './style.css';
import html from './template.html';

const template = componentTemplateFactory(html, css);

class CardMenu extends HTMLElement {
  connectedCallback() {
    $(this).html(template.content.cloneNode(true));

    this._category = this.getAttribute('data-category') || null;
    this._items = JSON.parse(decodeURIComponent(this.getAttribute('items'))) || null;
    this.render();
  }

  async render() {
    $(`card-menu[data-category='${this._category}']`).html(template.content.cloneNode(true));

    const content = this._items.map((item) => {
      const { name } = item;
      const restaurantMenu = RestaurantMenu.filter((menu) => menu.name === item.name)[0];
      const pictureSmall = restaurantMenu ? restaurantMenu.picture.small : '';
      const pictureMedium = restaurantMenu ? restaurantMenu.picture.medium : '';
      const pictureLarge = restaurantMenu ? restaurantMenu.picture.large : '';
      const rating = restaurantMenu ? restaurantMenu.rating : '';
      const servingTime = restaurantMenu ? restaurantMenu.time : '';
      const category = restaurantMenu ? restaurantMenu.category : '';
      const description = restaurantMenu ? restaurantMenu.description : '';

      return `
        <div class="main-card">
            <div class="col-image">
                <img class="lazyload" src="assets/images/loading.gif" data-src="${pictureMedium}" 
                    data-srcset="${pictureSmall} 480w, ${pictureLarge} 800w"
                    sizes="(max-width: 600px) 480px, 800px"
                    alt="${name}" crossorigin="anonymous"/>
            </div>
            <div class="col-info">
                <h1>${name}</h1>
                <div class="basic-info">
                    <div class="basic-info-col">
                        <i class="fa fa-star active" aria-hidden="true"></i>
                        <span>${rating}</span>
                    </div>
                    <div class="basic-info-col">
                        <i class="fa fa-clock-o" aria-hidden="true"></i>
                        <span>${servingTime} Mins</span>
                    </div>
                    <div class="basic-info-col">
                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                        <span>${category}</span>
                    </div>
                </div>
                <p class="additional-info">
                    ${description}
                </p>
            </div>
        </div>`;
    });

    $(`card-menu[data-category='${this._category}']`).append(content);
  }
}

if (!customElements.get('card-menu')) { customElements.define('card-menu', CardMenu); }

import componentTemplateFactory from '../../utils/component-template-factory';
import css from './style.css';
import html from './template.html';

const template = componentTemplateFactory(html, css);

class CardFood extends HTMLElement {
  set content(items) {
    this._items = items;
    this.render();
  }

  async render() {
    $('card-food').html(template.content.cloneNode(true));

    const content = this._items.map((item) => `
    <div class="main-card">
        <div class="col-image">
            <img class="lazyload" src="assets/images/loading.gif" data-src="${item.picture.medium}" 
                data-srcset="${item.picture.small} 480w, ${item.picture.large} 800w"
                sizes="(max-width: 600px) 480px, 800px"
                alt="${item.name}" crossorigin="anonymous"/>
        </div>
        <div class="col-info">
            <h1>${item.name}</h1>
            <div class="basic-info">
                <div class="basic-info-col">
                    <i class="fa fa-star active" aria-hidden="true"></i>
                    <span>${item.rating}</span>
                </div>
                <div class="basic-info-col">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                    <span>${item.time} Mins</span>
                </div>
                <div class="basic-info-col">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    <span>${item.category}</span>
                </div>
            </div>
            <p class="additional-info">
                ${item.description}
            </p>
        </div>
    </div>`);

    $('card-food').append(content);
  }
}

customElements.define('card-food', CardFood);

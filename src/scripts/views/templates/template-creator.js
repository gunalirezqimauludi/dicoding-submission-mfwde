// components
import '../../component/card-menu';

const createRestaurantMenusTemplate = (category, menus) => `
  <div class="main-list" style="${category === 'drinks' ? 'margin-top: 40px;' : ''}">
      <div class="main-header">
          <div class="main-title">
              <h1>${category}</h1>
          </div>
      </div>
      <div class="main-content">
          <card-menu data-category="${category}" items="${encodeURIComponent(JSON.stringify(category === 'foods' ? menus.foods : menus.drinks))}"></card-menu>
      </div>
  </div>
`;

const createCustomerReviewTemplate = (review) => `
  <div class="main-card">
      <div class="col-image">
          <img class="lazyload" src="assets/images/loading.gif" data-src="/assets/images/customer-review-medium.png"
            data-srcset="/assets/images/customer-review-small.png 480w, /assets/images/customer-review-large.png 800w"
            sizes="(max-width: 600px) 480px, 800px"
            alt="${review.name}" crossorigin="anonymous"/>
      </div>
      <div class="col-info">
          <h4>${review.name}</h4>
          <p class="note">${review.review}</p>
          <p class="date">${review.date}</p>
      </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="btn btn-fab">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="btn btn-fab">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantMenusTemplate,
  createCustomerReviewTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};

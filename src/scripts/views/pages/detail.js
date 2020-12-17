import swal from 'sweetalert';
import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import RenderError from '../../utils/render-error';

import { createRestaurantMenusTemplate, createCustomerReviewTemplate } from '../templates/template-creator';

// components
import '../../component/app-breadcrumb';
import '../../component/header-restaurant';
import '../../component/shimmer-header-restaurant';
import '../../component/shimmer-card-food';

const Detail = {
  async render() {
    return `
      <div class="main-header">
          <app-breadcrumb title=""></app-breadcrumb>
          <shimmer-header-restaurant></shimmer-header-restaurant>
          <header-restaurant></header-restaurant>
      </div>
      <div class="container">
          <div class="main-menu">
            <div class="shimmer-container-foods">
              <shimmer-card-food></shimmer-card-food>
              <shimmer-card-food></shimmer-card-food>
              <shimmer-card-food></shimmer-card-food>
              <shimmer-card-food></shimmer-card-food>
              <shimmer-card-food></shimmer-card-food>
              <shimmer-card-food></shimmer-card-food>
            </div>
          </div>
          <div class="main-list" style="margin-top: 40px;">
              <div class="main-header">
                  <div class="main-title">
                      <h1>Review</h1>
                  </div>
              </div>
              <form class="main-form">
                  <div class="col-form">
                      <label for="name">Name</label>
                      <input type="text" id="name" name="name" placeholder="Enter your name" value="">
                  </div>
                  <div class="col-form">
                      <label for="review">Review</label>
                      <textarea id="review" name="review" placeholder="Your review here..." rows="5"></textarea>
                  </div>
                  <button id="submitReview" aria-label="submit review" class="btn btn-warning">Submit</button>
              </form>
              <div class="main-review"></div>
          </div>
          <div id="likeButtonContainer"></div>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const headerRestaurant = document.querySelector('header-restaurant');
    const appBreadcrumb = document.querySelector('app-breadcrumb');

    try {
      const results = await RestaurantSource.detailRestaurant(url.id);
      headerRestaurant.content = results;
      $('shimmer-header-restaurant').remove();

      // Set Title Breadcrumb Active
      appBreadcrumb.title = results.name;

      // Get Menu Categories
      $('.main-menu').html('');
      Object.keys(results.menus).map((category) => $('.main-menu').append(createRestaurantMenusTemplate(category, results.menus)));

      // Get Customer Review
      results.customerReviews.map((review) => $('.main-review').append(createCustomerReviewTemplate(review)));

      // Scroll to Top
      window.scrollTo(0, 0);

      // Add New Customer Review
      await this.addCustomerReviews(url.id);

      // Button Like
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: results.id,
          name: results.name,
          pictureId: results.pictureId,
          rating: results.rating,
          city: results.city,
          description: results.description,
        },
      });
    } catch (message) {
      RenderError(message);
    }
  },

  async addCustomerReviews(id) {
    $('#submitReview').click(() => {
      const name = document.getElementById('name').value;
      const review = document.getElementById('review').value;

      if (name !== '' || review !== '') {
        const reviewData = {
          id,
          name,
          review,
        };

        RestaurantSource.reviewRestaurant(reviewData)
          .then((data) => {
            if (data.customerReviews) {
              swal('Thank You for Your Review', 'Your review has been sent successfully', 'success');

              $('.main-review').html('');
              data.customerReviews.map((newReview) => $('.main-review').append(createCustomerReviewTemplate(newReview)));
            }
          });
      } else {
        swal('Sorry!', 'Please fill out the form completely to add your review!', 'error');
      }
    });
  },
};

export default Detail;

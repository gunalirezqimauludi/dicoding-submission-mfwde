import FavoriteRestaurantIdb from '../../data/restaurant-idb';
import RenderError from '../../utils/render-error';

// components
import '../../component/card-restaurant';
import '../../component/shimmer-card-restaurant';

const Favorite = {
  async render() {
    return `
        <style>
            .main-content .empty-favorite {
                text-align: center;
            }

            .main-content .empty-favorite img {
                width: 35%;
            }

            /* Medium devices (tablets, 768px and up) */
            @media (max-width: 991.98px) {
                .main-content card-restaurant {
                    display: grid!important;
                    grid-template-columns: 1fr;
                    gap: 20px;
                }

                .main-content card-restaurant .main-card {
                    width: 97%!important;
                }

                .main-content card-restaurant .main-card .col-image {
                    height: 265px!important;
                }
            }

            /* Large devices (desktops, 992px and up) */
            @media (min-width: 992px) and (max-width: 1199.98px) {
                .main-content card-restaurant {
                    display: grid!important;
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                    gap: 15px;
                }

                .main-content card-restaurant .main-card {
                    width: 215px!important;
                }

                .main-content card-restaurant .main-card .col-image {
                    height: 155px!important;
                }
            }

            /* Extra large devices (large desktops, 1200px and up) */
            @media (min-width: 1200px) {
                .main-content card-restaurant {
                    display: grid!important;
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                    gap: 15px;
                }

                .main-content card-restaurant .main-card {
                    width: 261px!important;
                }

                .main-content card-restaurant .main-card .col-image {
                    height: 175px!important;
                }
            }
        </style>
        <div class="container">
            <div class="main-list" style="margin-top: 80px;">
                <div class="main-header">
                    <div class="main-title">
                        <h1>Favorited Restaurant</h1>
                    </div>
                </div>
                <div class="main-content">
                    <div class="shimmer-container-favorite">
                        <shimmer-card-restaurant></shimmer-card-restaurant>
                        <shimmer-card-restaurant></shimmer-card-restaurant>
                        <shimmer-card-restaurant></shimmer-card-restaurant>
                        <shimmer-card-restaurant></shimmer-card-restaurant>
                        <shimmer-card-restaurant></shimmer-card-restaurant>
                    </div>
                    <card-restaurant></card-restaurant>
                </div>
            </div>
        </div>
    `;
  },

  async afterRender() {
    const cardRestaurant = document.querySelector('card-restaurant');

    try {
      const results = await FavoriteRestaurantIdb.getAllRestaurant();
      if (results.length === 0) {
        $('.main-content').html(`<div class="empty-favorite">
            <img src="/assets/images/empty-favorite.png">
            <p>favorite restaurant data not found</p>
        </div>`);
      } else {
        cardRestaurant.content = results;
      }
      $('.shimmer-container-favorite').remove();
    } catch (message) {
      RenderError(message);
    }
  },
};

export default Favorite;

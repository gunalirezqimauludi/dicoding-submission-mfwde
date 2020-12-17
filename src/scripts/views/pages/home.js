import RestaurantSource from '../../data/restaurant-source';
import FoodSource from '../../data/food-source';
import RenderError from '../../utils/render-error';

// components
import '../../component/card-restaurant';
import '../../component/card-food';
import '../../component/hero-image';
import '../../component/shimmer-card-restaurant';
import '../../component/shimmer-card-food';

const Home = {
  async render() {
    return `
      <div class="container">
            <hero-image title="Let's explore good food near you."></hero-image>
            <div class="main-list">
                <div class="main-header">
                    <div class="main-title">
                        <h1>Recomended Restaurant</h1>
                        <p>Try these and thank us later!</p>
                    </div>
                    <a href="#">See All</a>
                </div>
                <div class="main-content">
                    <div class="shimmer-container-restaurants">
                      <shimmer-card-restaurant></shimmer-card-restaurant>
                      <shimmer-card-restaurant></shimmer-card-restaurant>
                      <shimmer-card-restaurant></shimmer-card-restaurant>
                      <shimmer-card-restaurant></shimmer-card-restaurant>
                      <shimmer-card-restaurant></shimmer-card-restaurant>
                    </div>
                    <card-restaurant></card-restaurant>
                </div>
            </div>
            <div class="main-list">
                <div class="main-header">
                    <div class="main-title">
                        <h1>Recomended Food</h1>
                        <p>Try these and thank us later!</p>
                    </div>
                    <a href="#">See All</a>
                </div>
                <div class="main-content">
                    <div class="shimmer-container-foods">
                      <shimmer-card-food></shimmer-card-food>
                      <shimmer-card-food></shimmer-card-food>
                      <shimmer-card-food></shimmer-card-food>
                      <shimmer-card-food></shimmer-card-food>
                      <shimmer-card-food></shimmer-card-food>
                      <shimmer-card-food></shimmer-card-food>
                    </div>
                    <card-food></card-food>
                </div>
            </div>
        </div>
    `;
  },

  async afterRender() {
    const cardRestaurant = document.querySelector('card-restaurant');

    try {
      const results = await RestaurantSource.listRestaurant();
      cardRestaurant.content = results;
      $('.shimmer-container-restaurants').remove();
    } catch (message) {
      RenderError(message);
    }

    const cardFood = document.querySelector('card-food');

    try {
      const results = await FoodSource.listFood();
      cardFood.content = results;
      $('.shimmer-container-foods').remove();
    } catch (message) {
      RenderError(message);
    }
  },
};

export default Home;

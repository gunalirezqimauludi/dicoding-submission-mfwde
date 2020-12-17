const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

const firstCondition = 'favorite restaurant data not found';

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.main-content');
  I.see(firstCondition, '.empty-favorite p');
});

Scenario('liking and unliking one restaurant', async ({ I }) => {
  // Like Restaurant
  I.see(firstCondition, '.empty-favorite p');

  I.amOnPage('/');

  I.seeElement('card-restaurant');

  const firstLocateRestaurant = locate('card-restaurant a').first();
  const firstRestaurant = locate('card-restaurant .title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstLocateRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('card-restaurant');

  const favoritedRestaurantTitle = await I.grabTextFrom('card-restaurant .title');
  assert.strictEqual(firstRestaurantTitle, favoritedRestaurantTitle);

  // Unlike Restaurant
  I.click(firstLocateRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.empty-favorite p');

  const unFavoritedRestaurant = await I.grabTextFrom('.empty-favorite p');
  assert.strictEqual(unFavoritedRestaurant, firstCondition);
});

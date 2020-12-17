Feature('Reviewing Restaurants');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('posting review restaurant', async ({ I }) => {
  const review = 'E2E Testing';

  I.seeElement('card-restaurant');
  I.click(locate('card-restaurant a').first());

  I.seeElement('.main-form');
  I.fillField('name', 'User');
  I.fillField('review', 'E2E Testing');
  I.click('#submitReview');

  I.see(review, '.main-review .note');
});

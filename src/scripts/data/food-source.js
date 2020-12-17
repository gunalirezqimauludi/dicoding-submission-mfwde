class FoodSource {
  static async listFood() {
    const response = await fetch('./assets/data/food-data.json');
    const responseJson = await response.json();
    return responseJson.foods;
  }
}

export default FoodSource;

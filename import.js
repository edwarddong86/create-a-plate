/**
 * Created by edwarddong on 5/27/15.
 */
var food = {
  "food": [
    {
      "name": "beef sirloin",
      "calories": 69,
      "amount": 1,
      "type": "protein",
      "img": "steak.gif"
    },
    {
      "name": "chicken breast",
      "calories": 49,
      "amount": 1,
      "type": "protein",
      "img": "chicken.jpeg"
    },
    {
      "name": "pork loin",
      "calories": 69,
      "amount": 1,
      "type": "protein",
      "img": "chopCartoon.png"
    },
    {
      "name": "salmon",
      "calories": 59,
      "amount": 1,
      "type": "protein",
      "img": "salmon.jpeg"
    },
    {
      "name": "brown rice",
      "calories": 31.4,
      "amount": 1,
      "type": "carbohydrates",
      "img": "brown-rice.jpg"
    },
    {
      "name": " wheat bread",
      "calories": 73,
      "amount": 1,
      "type": "carbohydrates",
      "img": "wheat-bread.jpg"
    },
    {
      "name": "pasta",
      "calories": 105.3,
      "amount": 1,
      "type": "carbohydrates",
      "img": "pasta.jpg"
    },
    {
      "name": "tomatoes",
      "calories": 22,
      "amount": 1,
      "type": "vegetables",
      "img": "tomato.gif"
    },
    {
      "name": "cucumber",
      "calories": 8,
      "amount": 1,
      "type": "vegetables",
      "img": "cucmber.gif"
    },
    {
      "name": "apple",
      "calories": 95,
      "amount": 1,
      "type": "fruits",
      "img": "apple.jpg"
    },
    {
      "name": "orange",
      "calories": 45,
      "amount": 1,
      "type": "fruits",
      "img": "orange.png"
    },
    {
      "name": "banana",
      "calories": 105,
      "amount": 1,
      "type": "fruits",
      "img": "banana.png"
    },
    {
      "name": "almonds",
      "calories": 163,
      "amount": 1,
      "type": "fats",
      "img": "almond.jpg"
    },
    {
      "name": "olive oil",
      "calories": 251.2,
      "amount": 1,
      "type": "fats",
      "img": "olive-oil.jpg"
    },
    {
      "name": "coconut oil",
      "calories": 251.2,
      "amount": 1,
      "type": "fats",
      "img": "coconut-oil.jpg"
    }
  ]
};

$.each(food.food, function(i, food) {
  $.ajax( { url: "https://api.mongolab.com/api/1/databases/create-a-plate/collections/test-coll?apiKey=T762mhY9dgHw6pdr4VeEhOdDaZi-zv-S",
        data: JSON.stringify(food),
        type: "POST",
        contentType: "application/json"
      }
  );
});

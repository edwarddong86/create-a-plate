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
      "img":
    },
    {
      "name": "chicken breast",
      "calories": 49,
      "amount": 1,
      "type": "protein",
      "img":
    },
    {
      "name": "pork loin",
      "calories": 69,
      "amount": 1,
      "type": "protein",
      "img":
    },
    {
      "name": "salmon",
      "calories": 59,
      "amount": 1,
      "type": "protein",
      "img":
    },
    {
      "name": "brown rice",
      "calories": 31.4,
      "amount": 1,
      "type": "carbohydrates",
      "img":
    },
    {
      "name": " wheat bread",
      "calories": 73,
      "amount": 1,
      "type": "carbohydrates",
      "img":
    },
    {
      "name": "pasta",
      "calories": 105.3,
      "amount": 1,
      "type": "carbohydrates",
      "img":
    },
    {
      "name": "tomatoes",
      "calories": 22,
      "amount": 1,
      "type": "vegetables",
      "img":
    },
    {
      "name": "cucumber",
      "calories": 8,
      "amount": 1,
      "type": "vegetables",
      "img":
    },
    {
      "name": "apple",
      "calories": 95,
      "amount": 1,
      "type": "fruits",
      "img":
    },
    {
      "name": "orange",
      "calories": 45,
      "amount": 1,
      "type": "fruits",
      "img":
    },
    {
      "name": "banana",
      "calories": 105,
      "amount": 1,
      "type": "fruits",
      "img":
    },
    {
      "name": "almonds",
      "calories": 163,
      "amount": 1,
      "type": "fats",
      "img":
    },
    {
      "name": "olive oil",
      "calories": 251.2,
      "amount": 1,
      "type": "fats",
      "img":
    },
    {
      "name": "coconut oil",
      "calories": 251.2,
      "amount": 1,
      "type": "fats",
      "img":
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

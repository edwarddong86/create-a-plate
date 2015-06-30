/**
 * Created by edwarddong on 5/27/15.
 */
var food = {
  "food": [
    {
      "name": "Beef Sirloin",
      "calories": 69,
      "amount": 1,
      "type": "protein",
      "img": "steak.gif"
    },
    {
      "name": "Chicken Breast",
      "calories": 49,
      "amount": 1,
      "type": "protein",
      "img": "chicken.png"
    },
    {
      "name": "Pork Loin",
      "calories": 69,
      "amount": 1,
      "type": "protein",
      "img": "chopCartoon.png"
    },
    {
      "name": "Salmon",
      "calories": 59,
      "amount": 1,
      "type": "protein",
      "img": "salmon.png"
    },
    {
      "name": "Brown Rice",
      "calories": 31.4,
      "amount": 1,
      "type": "carbohydrates",
      "img": "brown-rice.png"
    },
    {
      "name": "Wheat Bread",
      "calories": 73,
      "amount": 1,
      "type": "carbohydrates",
      "img": "wheat-bread.png"
    },
    {
      "name": "Pasta",
      "calories": 105.3,
      "amount": 1,
      "type": "carbohydrates",
      "img": "pasta.png"
    },
    {
      "name": "Tomatoes",
      "calories": 22,
      "amount": 1,
      "type": "vegetables",
      "img": "tomato.gif"
    },
    {
      "name": "Cucumber",
      "calories": 8,
      "amount": 1,
      "type": "vegetables",
      "img": "cucumber.gif"
    },
    {
      "name": "Apple",
      "calories": 95,
      "amount": 1,
      "type": "fruits",
      "img": "apple.png"
    },
    {
      "name": "Orange",
      "calories": 45,
      "amount": 1,
      "type": "fruits",
      "img": "orange.png"
    },
    {
      "name": "Banana",
      "calories": 105,
      "amount": 1,
      "type": "fruits",
      "img": "banana.png"
    },
    {
      "name": "Almonds",
      "calories": 163,
      "amount": 1,
      "type": "fats",
      "img": "almond.png"
    },
    {
      "name": "Olive Oil",
      "calories": 251.2,
      "amount": 1,
      "type": "fats",
      "img": "olive-oil.png"
    },
    {
      "name": "Coconut Oil",
      "calories": 251.2,
      "amount": 1,
      "type": "fats",
      "img": "coconut-oil.png"
    }
  ]
};

$.each(food.food, function(i, food) {
  $.ajax( { url: /*type url */,
        data: JSON.stringify(food),
        type: "POST",
        contentType: "application/json"
      }
  );
});

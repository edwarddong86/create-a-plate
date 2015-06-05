/**
 * Created by edwarddong on 5/26/15.
 */
var BMR = 2500;

var bmiCalculator = function (weight, heightFeet, heightInches) {
  var bmiWeight = weight * 703;
  var bmiHeight = heightFeet * 12 + heightInches;
  var bmi = bmiWeight / bmiHeight / bmiHeight;
  bmi = bmi.toFixed(1);
  if (bmi < 18.5) {
    bmiMessage = "Your BMI is " + bmi +
    " The normal BMI is 18.5 - 24.99.  " +
    "Let's get you started on a plan to get to a healthier weight!";
  } else if (bmi < 24.99 && bmi >= 18.5) {
    bmiMessage = "Your BMI is " + bmi +
    " Please continue to make a plan for you to maintain a healthy weight";
  } else if (bmi < 29.99 && bmi >= 25) {
    bmiMessage = "Your BMI is " + bmi +
    " The normal BMI is 18.5 - 24.99.  " +
    "Let's get started on making a plan to reach a healthier weight!"
  } else {
    bmiMessage = "Your BMI is " + bmi +
    " Let's not waste a minute and get you to your ideal weight!";
  }
  return bmiMessage
};

var calculateThreshold = function (bmr, caloriesToLose, numberOfPlates) {
  var calsInPlate = (bmr / 3) - (caloriesToLose / numberOfPlates);
  calsInPlate.toFixed(1);
  return calsInPlate;
};

var addToPlate = function(food) {
  var $food = $('<td>').text(food.draggable.attr('data-name')).css({'font-weight': 'bold'});
  var $row = $('<tr>');
  $row.append($food);
  $row.attr('data-calories', food.draggable.attr('data-calories'));
  $row.attr('data-img', food.draggable.attr('src'));
  var $amountHolder = $('<td>');
  var $amount = $('<span>').addClass('food-amount');
  $amountHolder.append($amount);
  $row.append($amountHolder);
  $('.plate-info-list').append($row);
};

var portionFoods = function() {
  var $foods = $('.plate-info-list tr');
  var caloriesPerFood = Math.floor(parseInt($('.maxCaloriesPerPlate').text()) / $foods.length);
  $.each($foods, function(i, food) {
    var portion = (caloriesPerFood / parseInt($(food).attr('data-calories'))).toFixed(0);
    console.log($foods);
    for(var i = 0; i < portion; i++) {
      $('.plate').append(
          $('<img>').addClass('img-responsive')
      );
    }
    console.log($(food).find('.food-amount').text(portion), portion);
  });
};

//make the food list item toggle
var toggleFoodItemList = function() {
  $('.plate-info').slideUp().slideDown().show();
};

// Display the modal
$('#myModal').modal('show');

// Display the BMI Calculation
$('#calculate-bmi').on('click', function(){
  var weight = parseInt($('input#weight').val());
  var heightFeet = parseInt($('input#height-feet').val());
  var heightInches = parseInt($('input#height-inches').val());
  var bmiInfo = bmiCalculator(weight, heightFeet, heightInches);
  $('#bmi-results').text(bmiInfo).css({'font-weight': 'bold'});
});

// Determine the users weight loss goal
$('#start-button').on('click', function() {
  var numberOfPlates = parseInt($('select#select-time').val() * 7 * 3);
  var caloriesToLose = parseInt($('select#select-weight').val() * 3500);
  var caloriesPerPlate = (calculateThreshold(BMR, caloriesToLose, numberOfPlates)).toFixed(0);
  var calories = $('<span>').text(caloriesPerPlate).addClass('maxCaloriesPerPlate');
  var caloriesDisplay = $('<h3>').text('Total Calories: ').css({'font-weight': 'bold'});
  caloriesDisplay.append(calories);
  $('.plate-info').show().prepend(caloriesDisplay);
});

// Show Accordion
$('.food-list-accordion').accordion({
  collapsible: true,
  heightStyle: "content",
  active: 'none'
});

// Allow User to Add Food to Plate

$('.plate').droppable( {
  drop: function( event, food) {
    toggleFoodItemList();
    addToPlate(food);
    portionFoods();
  }
});

// Make food list
$.ajax({
  url: "https://api.mongolab.com/api/1/databases/create-a-plate/collections/test-coll",
  data: {
    apiKey: "T762mhY9dgHw6pdr4VeEhOdDaZi-zv-S"
  },
  success: function(foods) {
    $.each(foods, function (i, food) {
      switch(food.type) {
        case "protein": addFood(food, $('#proteinList'));
          break;
        case "carbohydrates": addFood(food, $('#carbList'));
          break;
        case "vegetables": addFood(food, $('#vegeList'));
          break;
        case "fruits": addFood(food, $('#fruitList'));
          break;
        case "fats": addFood(food, $('#fatList'));
          break;
        default:
          console.log('unknown food type');
      }

      function addFood(food, $foodCategory) {
        var $foodListItem = $('<li>');
        var $img = $('<img>');
        $img.attr('src','images/' +food.img);
        $img.attr('data-name', food.name);
        $img.attr('data-calories', food.calories);
        $img.attr('data-amount', food.amount);
        $foodListItem.append($img);
        $foodCategory.append($foodListItem);
        $img.addClass('food-pic').draggable(
            {
              revert: 'invalid',
              scroll: false,
              containment: 'window',
              helper: 'clone',
              cursor: 'move',
              stack: '.food-pic',
              start: function() {
                this.style.display = "";
              },
              stop: function(){
                this.style.display= "block";
              }
            }
        )
      }
    })
  }
});


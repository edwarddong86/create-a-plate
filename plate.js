/**
 * Created by edwarddong on 5/26/15.
 */
var foodInfoArray = [];
$('#myModal').modal('show');

var calculateThreshold = function (bmr, caloriesToLose, timeFrame) {
  var calsInPlate = (bmr/3) - (caloriesToLose/timeFrame);
  calsInPlate.toFixed(1);
  console.log(calsInPlate);
  return calsInPlate;
};

var createFoodInfo = function(food) {
  var bmr = 2500;
  var $timeFrame = parseInt($('select#select-time').val());
  var $lbsToLose = parseInt($('select#select-weight').val());
  var perPlate = $timeFrame * 7 * 3;
  var caloriesToLose = $lbsToLose*3500;
  var storedMaxCalories = calculateThreshold(bmr, caloriesToLose, perPlate);
  var $foodInfoItem = $('<li>');
  var foodName = food.draggable.attr('data-name');
  var $plateInfoList = $('.plate-info-list');
  var foodAmount = Math.floor(parseInt(storedMaxCalories) / parseInt(food.draggable.attr('data-calories')));
  foodInfoArray.push(foodName, foodAmount);
  console.log(foodInfoArray);
  $plateInfoList.append($foodInfoItem);
  $foodInfoItem.append(foodName + ' amount: ' + '<span class="food-amount">' + foodAmount + '</span>' + ' oz');
};

var recalculateFoodInfo = function(currentFoods, maxCalories) {
  var divideCalories = parseInt(maxCalories)/parseInt(currentFoods);
  for(var i = 0; i < foodInfoArray.length; i++) {
    $('ul.plate-info-list').children().contains(foodInfoArray[i]).each(function(index){
      var recalculatedAmount = parseInt(divideCalories)/parseInt(foodInfoArray[i+1]);
      $(this).find('span').text().remove();
      $(this).find('span').text(recalculatedAmount);
    })
  }
};

$('#start-button').on('click', function(){
  this.maxPlateCalories = function() {
    var bmr = 2500;
    var $timeFrame = parseInt($('select#select-time').val());
    var $lbsToLose = parseInt($('select#select-weight').val());
    var perPlate = $timeFrame * 7 * 3;
    var caloriesToLose = $lbsToLose*3500;
    this.$plateInfo = $('div.plate-info');
    this.$plateInfo.show();
    this.$thresholdPlaceHolder = $('<h3>');
    this.$thresholdPlaceHolder.text('Maximum Calories: ' + Math.floor(calculateThreshold(bmr, caloriesToLose, perPlate)));
    this.$plateInfo.prepend(this.$thresholdPlaceHolder);
  };
  this.maxPlateCalories();
});

$(function() {
  $('.food-pic').draggable();
  $('.plate').droppable( {
    drop: function( event, ui) {
      var newTotal = parseInt($('#calorie-total > span').text()) + parseInt(ui.draggable.attr('data-calories'));
      $('#calorie-total > span').text(newTotal);
      var draggedTotal = foodInfoArray.length/2;
      var bmr = 2500;
      var $timeFrame = parseInt($('select#select-time').val());
      var $lbsToLose = parseInt($('select#select-weight').val());
      var perPlate = $timeFrame * 7 * 3;
      var caloriesToLose = $lbsToLose*3500;
      var storedMaxCalories = calculateThreshold(bmr, caloriesToLose, perPlate);
      createFoodInfo(ui);
      console.log(recalculateFoodInfo(draggedTotal, storedMaxCalories));
    }
  });
});
//Before this make a function that stores the data attributes
//Take the current list of items.
//Take the current max calories.
//Divide the max calories by the number of items
//For each Item
//Divide each items calorie portion by its calories per oz
//divide the portion of total calories by calories per oz
//redraw each items amount in oz's

//bmi calculator
$(function() {
  var bmiCalculator = function (weight, heightFeet, heightInches) {
    bmiMessagePosition = $('#bmi-results');
    var bmiWeight = weight * 703;
    var bmiHeight = heightFeet*12 + heightInches;
    var bmi = bmiWeight/bmiHeight/bmiHeight;
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

    bmiMessagePosition.prepend(bmiMessage);
  };
  $('#calculate-bmi').on('click', function(){
    var weight = parseInt($('input#weight').val());
    var heightFeet = parseInt($('input#height-feet').val());
    var heightInches = parseInt($('input#height-inches').val());
    bmiCalculator(weight, heightFeet, heightInches);
  });
});


//This populates the food list from the mongolab database
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
        $img.addClass('food-pic').draggable({
          revert: 'invalid',
          scroll: false,
          containment: 'window',
          helper: 'clone',
          start: function() {
            this.style.display = "none";
          },
          stop: function(){
            this.style.display= "";
          }
        })
      }
    })
  }
});

$('.food-list-accordion').accordion({
  collapsible: true,
  heightStyle: "content",
  active: 'none'
});


/**
 * Created by edwarddong on 5/26/15.
 */

//This creates the plate and makes any class with food-pic draggable

var bmr;

$(function() {
  $('.food-pic').draggable();
  $('.plate').droppable( {
    drop: function( event, ui) {
      var newTotal = parseInt($('#calorie-total > span').text()) + parseInt(ui.draggable.attr('data-calories'));
      $('#calorie-total > span').text(newTotal);
    }
  });
});


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

var plateThreshold = function (bmr, caloriesToLose, timeFrame) {
  var calsInPlate = (bmr/3) - (caloriesToLose/timeFrame);
  calsInPlate.toFixed(0);
  console.log(calsInPlate);
  return calsInPlate;

};

$('#start-button').on('click', function(){
  var bmr = 2500;
  var $timeFrame = parseInt($('select#select-time').val());
  var perPlate = $timeFrame * 7 * 3;
  var $lbsToLose = parseInt($('select#select-weight').val());
  var caloriesToLose = $lbsToLose*3500;
  plateThreshold(bmr, caloriesToLose, perPlate);
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


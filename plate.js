/**
 * Created by edwarddong on 5/26/15.
 */

$(function() {
  $('.food-pic').draggable();
  $('.plate').droppable( {
    drop: function( event, ui) {

      $(this).addClass('ui-state-highlight').find('p').html('Droped!');
    }
  });
});

$(function() {
  $('.food-categories').selectable().on('click', function(){
  });
});


$(function() {
  var weight = $('#weight').val();
  var heightFeet = $('#height-feet').val();
  var heightInches = $('#height-inch').val();

  var bmiCalculator = function (weight, heightFeet, heightInches) {
    var bmi = (weight * 703) / (((heightFeet * 12) * (heightInches)) * ((heightFeet * 12) * (heightInches)));
    var bmiMessage = '';
    var bmiMessagePosition = $('#calculate-bmi');
    return bmi;
    if (bmi < 18.5) {
      bmiMessage = "Your BMI is " + bmi +
      "The normal BMI is 18.5 - 24.99.  " +
      "Let's get you started on a plan to get to a healthier weight!";
    } else if (bmi < 24.99 && bmi >= 18.5) {
      bmiMessage = "Your BMI is " + bmi +
      "Please continue to make a plan for you to maintain a healthy weight";
    } else if (bmi < 29.99 && bmi >= 25) {
      bmiMessage = "Your BMI is " + bmi +
      "The normal BMI is 18.5 - 24.99.  " +
      "Let's get started on making a plan to reach a healthier weight!";
    } else {
      bmiMessage = "Your BMI is " + bmi +
      "Let's not waste a minute and get you to your ideal weight!";
    }
    bmiMessagePosition.after(bmiMessage);
  };
  $('#calculate-bmi').on('click', bmiCalculator(weight, heightFeet, heightInches));
});


$.ajax({
      url: "https://api.mongolab.com/api/1/databases/create-a-plate/collections/test-coll",
      data: {
        apiKey: "T762mhY9dgHw6pdr4VeEhOdDaZi-zv-S",
        q: "{type: 'protein'}"
      },
      success: function(protein) {
        $.each(protein, function (i, data ) {

        })
      }
    }
);


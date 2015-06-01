/**
 * Created by edwarddong on 5/26/15.
 */

//This creates the plate and makes any class with food-pic draggable
$(function() {
  $('.food-pic').draggable();
  $('.plate').droppable( {
    drop: function( event, ui) {

      $(this).addClass('ui-state-highlight').find('p').html('Droped!');
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
      "Let's get started on making a plan to reach a healthier weight!";
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


//This populates the proteins li from the mongolab database
$.ajax({
      url: "https://api.mongolab.com/api/1/databases/create-a-plate/collections/test-coll",
      data: {
        apiKey: "T762mhY9dgHw6pdr4VeEhOdDaZi-zv-S",
        q: "{type: 'protein'}"
      },
      success: function(protein) {
        $.each(protein, function (i, data ) {
          var $proteinListItem = $(document.createElement('li'));
          var $proteinImg = $(document.createElement('img'));
          $proteinImg.attr('src', 'images/' + data.img);
          $proteinImg.addClass('food-pic').draggable({
                  revert: 'invalid',
                  scroll: false,
                  containment: '',
                  helper: 'clone',
                  start : function() {
                  this.style.display="none";
                  },
                  stop: function() {
                  this.style.display="";
                  }});
          $proteinListItem.append($proteinImg);
          $('#proteinList').append($proteinListItem);
      })
    }
});

$('.food-list-accordion').accordion({
  collapsible: true,
  heightStyle: "content",
  active: 'none'
});


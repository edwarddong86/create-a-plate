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
  $('.food-categories').selectable();
});
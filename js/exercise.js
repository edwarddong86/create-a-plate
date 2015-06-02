/**
 * Created by edwarddong on 6/2/15.
 */
function palindrome(word) {
  var reverse = word.split('').reverse().join('');
  if(word === reverse){
    console.log('It is a palindrome');
  } else {
    console.log('This is not a palindrome')
  }
}

palindrome('ttttuuu');

function longestWord(sentence) {
  var myArray  = sentence.split(' ');
  console.log(myArray);
  var long = '';
  for (var i = 0; i < myArray.length; i++) {
    if(myArray[i].length > long.length) {
      long = myArray[i];
    }
  }
  return long;
}

console.log(longestWord('where is the longest word'));
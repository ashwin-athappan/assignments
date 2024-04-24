/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase();
  let characters = str.split("");
  let original = characters.filter((x) => x >= 'a' && x < 'z');
  let reverse = [...original];
  reverse.reverse();
  console.log(original);
  console.log(reverse);
  for (let i = 0; i < original.length; i ++) {
    if (original[i] !== reverse[i])
      return false;
  }

  return true;
}

module.exports = isPalindrome;

isPalindrome('hello');

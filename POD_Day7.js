/*
Given an array of integers, check to see if the array is already sorted (return true or false). 
Once you've solved it iteratively, try to solve it recursively or using functional programming.
If you have time, write and walk through some test cases for your code. 
What's the time complexity of your solution?
*/

// iterative
// linear O(n) time complexity?
const isSorted1 = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }

  return true;
}

const array1 = [1,2,3,4,5];
const array2 = [5,4,3,2,1];
const array3 = [-42, -12, 2, 58, 1359];
const array4 = [45, -12, 78, 1, 6];
const array5 = [0, 1, 56, 123, -2];
const array6 = [100, 1, 2, 3, 4];
const array7 = [1, 1, 2, 2, 4];
const array8 = [4, 4, 2, 2, 1];
const array9 = [1, 1, 1, 1, 1];

console.log(isSorted1(array1), '-> true');
console.log(isSorted1(array2), '-> false');
console.log(isSorted1(array3), '-> true');
console.log(isSorted1(array4), '-> false');
console.log(isSorted1(array5), '-> false');
console.log(isSorted1(array6), '-> false');
console.log(isSorted1(array7), '-> true');
console.log(isSorted1(array8), '-> false');
console.log(isSorted1(array9), '-> true');

// functional and recursive
// linear O(n) time complexity?
const isSorted3 = (arr) => {
  isValidInput(arr);
  
  return !!arr.reduce((acc, _, i, arr) => {
    if (acc !== 'true') return acc;
    if (arr[i] < arr[i + 1]) return isSortedInAscOrd(arr);
    if (arr[i] > arr[i + 1]) return isSortedInDescOrd(arr);
    return acc;
  }, 'true');
}

const isSortedInAscOrd = (arr) => {
  if (arr.length <= 1) return true;
  return arr[0] > arr[1] ? false : isSortedInAscOrd(arr.slice(1));
}

const isSortedInDescOrd = (arr) => {
  if (arr.length <= 1) return true;
  return arr[0] < arr[1] ? false : isSortedInDescOrd(arr.slice(1));
}

const isValidInput = (arr) => {
  if (!Array.isArray(arr)) throw new TypeError('Argument is not an array');
  
  arr.forEach(el => {
    if (!Number.isInteger(el) ) throw new TypeError('Input array may only contain integers ');
  });
}

console.log('---------------------------');
console.log(isSorted3(array1), '-> true');
console.log(isSorted3(array2), '-> true');
console.log(isSorted3(array3), '-> true');
console.log(isSorted3(array4), '-> false');
console.log(isSorted3(array5), '-> false');
console.log(isSorted3(array6), '-> false');
console.log(isSorted3(array7), '-> true');
console.log(isSorted3(array8), '-> true');
console.log(isSorted3(array9), '-> true');
console.log(isSorted3('trust me, I am an array'), '-> error');
console.log(isSorted3(['okay', 'how', 'about', 'now']), '-> error');
// POD Day 6 - Regular

// You are given an array of integers. Every number in the array appears twice, except for one. Find that single one.
// Challenge: solve this with linear time complexity

// Ex: 
// Input: [2, 2, 1]
// Output: 1

// Input: [4, 1, 2, 1, 2]
// Output: 4

// Input: [1]
// Output: 1

function singleNumber(arr) {
  cache = {};

  arr.forEach(num => {
    if (Object.keys(cache).includes(num.toString())) cache[num] += 1;
    else cache[num] = 1;
  });

  for (let k in cache) {
    if (cache[k] === 1) return k;
  }

  throw new Error('Am I a joke to you?');
}

// POD Day 6 - Advanced

// Given two arrays of integers sorted in ascending order, merge both into a single sorted array. Return the new array.
// The new array should contain all elements from the input arrays, including duplicates.

// Ex: 
// `let array1 = [1, 2, 5, 7, 9];
// let array2  = [0, 1, 3, 4, 6, 7, 9];
// mergeSortedArrays(array1, array2) -> [0, 1, 1, 2, 3, 4, 5, 6, 7, 7, 9, 9]`

function mergeSortedArrays(array1, array2){
  return [...array1, ...array2].sort((a, b) => a - b);
}

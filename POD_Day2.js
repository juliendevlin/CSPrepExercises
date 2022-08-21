//POD Regular - Part 1

function addingToX(num) {
  // declare a variable that will contain our result and assign it to the number 0
  let result = 0;
  
  // initialize a for loop
    // set our looping variable to 0
    // continue to iterate as long as looping variable is smaller or equal to input
    // increment looping variable by one
      // on each iteration, reassign the value of our result variable to its current value plus the value of the looping variable
  for (let i = 0; i <= num; i++) {
    result += i;
  }

  // return the results variable
  return result;
}

// Test your answer (delete the //)
console.log(addingToX(1));  // 1
console.log(addingToX(2));  // 3
console.log(addingToX(3));  // 6
console.log(addingToX(10)); // 55


// POD Regular - Part 2

function arrayToX(num) {
  // declare a output variable and assign it to an empty array
  const output = [];

  // initialize a for loop
    // push the evaluted result of invoking the function on the current iteration of the looping variable to our output array
  for (let i = 1; i <= num; i++) {
    output.push(addingToX(i));
  }
  
  // return the output array
  return output;
}

//Test your answer (delete the //)
console.log(arrayToX(1));   // [1]
console.log(arrayToX(2));   // [1, 3]
console.log(arrayToX(3));   // [1, 3, 6]
console.log(arrayToX(10));  // [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]

// POD Advanced
function modemean(array) {
  // return the evaluated result of comparing:
    // the evaluated result of invoking a function that calculates the mode of our input array 
    // with the evaluated result of invoking a function that calculates the mean of our input array
  
  return (calcMode(array) === calcMean(array));
}

function calcMean(array) {
  // declare a variable and assign it to the sum of the values in the array
  // declare a variable and assign it to the number of values in the array
  // return the sum of values divided by the number of values
  
  const sumOfValues = array.reduce((acc, num) => acc + num);
  const numberOfValues = array.length;
  return Math.floor(sumOfValues / numberOfValues);
}

function calcMode(array) {
  // declare a variable and assign it to an empty object, which will contain each individual element in the array as keys with the number of times they occur in the array as values
  // declare a variable and assign it an empty array, which will contain the modes of the array
  // iterate through the array
    // if the current array element exists as a property in our object, increment its value by 1
    // else create a property for the current element and assign its value to 1
  // return the key with the largest value from the object, as a number
  
  const occurrences = {};
  let modes = [];

  array.forEach(num => {
    if (occurrences[num] !== undefined) occurrences[num] += 1;
    else occurrences[num] = 1;
  });
  
  for (let num in occurrences) {
    if (occurrences[num] === Math.max(...Object.values(occurrences))) modes.push(Number(num));
  }

  return Math.max(...modes);
}

console.log(modemean([1, 4, 5, 5, 10]));
// should log true, mean & mode = 5

console.log(modemean([13, 18, 13, 14, 13, 16, 14, 21, 13]));
// should log false, mean = 15, mode = 13

console.log(modemean([5, 5, 6, 6, 3]));
// should log false, mean = 15, mode = 6

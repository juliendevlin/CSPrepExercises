////////////////////////////
//     Challenge 1
////////////////////////////

function product(arr, i = 0) {
  if (i === arr.length - 1) return arr[i];
  return arr[i] * product(arr, i + 1); 
}

// To check if you've completed the challenge, uncomment these console.logs!
// console.log(product([1, 2, 3, 4])); // -> 24
// console.log(product([1, 2, 3, 4, 5])); // -> 120
// console.log(product([4, 5, 6])); // -> 120



////////////////////////////
//     Challenge 2
////////////////////////////

function containsDuplicates(arr) {
  const cache = {}

  for (let i = 0; i < arr.length; i++) {
    if (cache[arr[i]]) {
      cache[arr[i]]++;
    } else {
      cache[arr[i]] = 1;
    }
  }
  console.log('cache: ', cache);
  for (let key in cache) {
    if (Number(cache[key]) !== 1) return true;
  }

  return false;
}

// To check if you've completed the challenge, uncomment these console.logs!
// console.log(containsDuplicates([1, 2, 3, 4, 5, 6])); // -> false
// console.log(containsDuplicates([1, 2, 3, 4, 5, 6, 3])); // -> true
// console.log(containsDuplicates([])); // -> false



////////////////////////////
//     Challenge 3
////////////////////////////

function createFib() {
  const memo = {}

  function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (memo[n] !== undefined) return memo[n];

    let fibn = fib(n-1) + fib(n-2);
    memo[n] = fibn;

    return fibn;
  }

  return fib;
}

const memoFib = createFib();

// To check if you've completed the challenge, uncomment these console.logs!
// console.log(memoFib(0)); // -> 0
// console.log(memoFib(5)); // -> 5
// console.log(memoFib(37)); // -> 24157817

// console.log(memoFib(45)); // only uncomment if you're sure that memoization is working!



////////////////////////////
//     Challenge 4
////////////////////////////

function smallestDiff(arr) {
	const sortedArr = arr.sort((a,b) => a - b);
  let diff = Infinity;
  
  sortedArr.reduce((acc, cur) => {
    if (cur - acc < diff) diff = cur - acc;
    return cur;
  });
  
  return diff;
}

// To check if you've completed the challenge, uncomment these console.logs!
// console.log(smallestDiff([4, 1, 3])); // -> 1
// console.log(smallestDiff([10, 20, 30, 40, 50, 60])); // -> 10
// console.log(smallestDiff([1, 2, 3, 4, 5, 6, 7])); // -> 1



////////////////////////////
//     Challenge 5
////////////////////////////

function balancedParens(str) {
  const stack = [];
  const parensArray = str.split('');
  
  for (let i = 0; i < parensArray.length; i ++) {
    if (parensArray[i] === '(') stack.push('(');
    else if (parensArray[i] == ')') {
      if (stack.length) stack.pop();
      else return false;
    }
    else throw new Error('array contains non-parenthetical elements');
  }

  return !stack.length;
}

// To check if you've completed the challenge, uncomment these console.logs!
// console.log(balancedParens('()')); // -> true
// console.log(balancedParens(')(')); // -> false
// console.log(balancedParens('(()(()))')); // -> true
// console.log(balancedParens('((()')); // -> false

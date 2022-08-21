// POD Day 4 - Regular
function twoSum(arr, target) {
  let output = false;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) output = true;
      break;
    }
    if (output === true) break;
  }

  return output;
}

// solution using nested reduce... :O 
function twoSum(arr, target) {
  return arr.reduce((acc1, cur1) => {
    if (acc1) return acc1
    else {
      return arr.reduce((acc2, cur2) => {
        if (cur1 + cur2 === target) return true
        else return acc2
      }, false);
    }
  }, false);
}

// another weird alternative solution
function twoSum(arr, target) {
  return !!arr.slice(0, arr.length -1).filter((el, i) => {
    return arr.slice(i + 1).reduce((acc, cur) => {
      if (el + cur === target) return true;
      else return acc;
    }, false);
  }).length;
}

// POD Day 4 - Advanced
function exclusiveSum(arr) {
  return arr.map((el, i1) => {
    return arr.reduce((acc, cur, i2) => {
      if (i1 !== i2) return acc + cur;
      else return acc;
    }, 0);
  });
}

function exclusiveProduct(arr) {
  return arr.map((el, i1) => {
    return arr.reduce((acc, cur, i2) => {
      if (i1 !== i2) return acc * cur;
      else return acc;
    }, 1);
  });
}
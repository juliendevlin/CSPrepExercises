// POD Day 3 - Regular

function largestAndSmallest(array) {
  if (!Array.isArray(array)) throw new TypeError('Argument is not an array.');

  const max = Math.max(...array);
  const min = Math.min(...array);

  return [min, max];
}

console.log(largestAndSmallest([1, 2, 3, 4, 5])); // should log [1, 5]
console.log(largestAndSmallest([90, 30, 44, 66, 10])); // should log [10, 90]
console.log(largestAndSmallest([16, -70, 122])); // should log [-70, 122]
console.log(largestAndSmallest('i am not an array ;)'));


// POD Day 3 - Advanced

function reverseNumber(num) {
  if (typeof(num) !== 'number') throw new TypeError('Argument is not a number.');

  if (Math.sign(num) > 0) return Number(num.toString().split('').reverse().join(''));
  else if (Math.sign(num) < 0) return (Math.sign(num)) * (Number(num.toString().split('').slice(1).reverse().join(''))); 
  else return num;
}

console.log(reverseNumber(456)); // should log 654
console.log(reverseNumber(1000)); // should log 1
console.log(reverseNumber(-789)); // should log -987
console.log(reverseNumber(0000)); 
console.log(reverseNumber(-0000)); 

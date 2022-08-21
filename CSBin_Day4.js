// http://csbin.io/cs-prep-big-data/YOUR-UNIQUE-ROOM-NAME-HERE

// 1
console.log(bitcoinData);

// 2
const bitcoinDataByDate = bitcoinData.filter(function(el){
  return el.date === `2013-05-01`;
});
console.log(bitcoinDataByDate);

// 3
const pricePerDate = bitcoinData.map(function (el) {
  const newObj = {
    date: el.date,
    price: el[`price(USD)`]
  };
  return newObj;
});
console.log(pricePerDate);

// 4
const thatDamnZero = bitcoinData.filter(function(el){
  return el['exchangeVolume(USD)'] > 0;
})
console.log(thatDamnZero);

// 5
const totalCoins = bitcoinData.reduce((acc, cur) => {
  return acc + cur.generatedCoins;
}, 0);

console.log(totalCoins);

// 6
const numberOfDays = bitcoinData.filter(function(el){
  return el[`price(USD)`] > 100;
}).length;
console.log(numberOfDays);

// 7
const sumOfFees = bitcoinData.reduce((acc, curr) => {
  return acc + curr.fees;
}, 0);

const averageBetweenYears = Math.floor(sumOfFees / bitcoinData.length);
console.log(averageBetweenYears);

// Bonus 1
function dayMapper(arr, prop1, prop2){
 return arr.map((obj) => {
   newObj = {};
   
   if(obj[prop1] !== undefined){
     newObj[prop1] = obj[prop1];
   }
   if(obj[prop2] !== undefined){
     newObj[prop2] = obj[prop2];
   }
   return newObj;
 });
};

console.log(dayMapper(bitcoinData, 'data', 'dodecoin'));

// Bonus 2
const averageValueOf = (arr, prop) => {
  const sumOfPropValues = arr.reduce((acc, cur) => {
    return acc + cur[prop];
  }, 0);
  const numberOfProp = arr.length;
  return Math.floor(sumOfPropValues / numberOfProp);
};

const allNumAverages = (arr) => {
  const avgObj = {};
  for (let prop in arr[0]) {
    if (typeof(arr[0][prop]) === 'number') avgObj['average' + prop[0].toUpperCase() + prop.slice(1)] = averageValueOf(arr, prop);
  }
  return avgObj;
};

console.log(allNumAverages(bitcoinData));

// Bonus 3
const generalAverageValue = (arr, property) => {
  const sumOfPropValues = arr.reduce((acc, cur) => {
    if (typeof(cur[property]) !== 'number') throw new Error('Property values are not numbers, cannot average non-number property values.')
    return acc + cur[property];
  }, 0);
  const numberOfProp = arr.length;
  const avg = Math.floor(sumOfPropValues / numberOfProp);
  return [property, avg];
};

console.log(generalAverageValue(bitcoinData, 'fees'));
console.log(generalAverageValue(bitcoinData, 'date'));

// Bonus 4
const priceRangeTally = (arr, prop, interval) => {
  const maxPrice = findMax(arr, prop);
  const minPrice = findMin(arr, prop);

  const ranges = createRanges(minPrice, maxPrice, interval);
  const tally = createTally(arr, prop, ranges);

  logTally(tally);
  return tally;
};

const findMax = (arr, prop) => {
  return arr.reduce((acc, cur) => {
    if (cur[prop] > acc) {
      return cur[prop];
    } else return acc;
  }, -Infinity);
};

const findMin = (arr, prop) => {
  return arr.reduce((acc, cur) => {
    if (cur[prop] < acc) {
      return acc = cur[prop];
    } else return acc;
  }, Infinity);
};

const createRanges = (min, max, interval) => {
  const ranges = [];
  let floor = 0;

  while (floor + interval < min) {
    floor += interval;
  }
  
  for (let i = floor; i <= max; i += interval) {
    ranges.push([i, i + interval]);
  }

  return ranges;
};

const createTally = (arr, prop, ranges) => {
  const tally = {};

  ranges.forEach((range) => {
    tally[`${range[0]}-${range[1]}`] = arr.filter((obj) => {

      return range[0] <= obj[prop] && obj[prop] < range[1]
    }).length;
  });
  
  return tally;
};

const logTally = (tally) => {
  outputStr = 'Tally of days per given price range \n';
  
  for (let range in tally) {
    outputStr += `${range}: ${tally[range]} days \n`;
  }

  console.log(outputStr);
};

console.log(priceRangeTally(bitcoinData, 'price(USD)', 100));

// Bonus 5
const MaxValsOfProps = (arr) => {
  return arr.reduce((acc, cur) => {
    
    for (let prop in cur) {
      if (acc[prop] !== undefined) {
        if (acc[prop] < cur[prop]) acc[prop] = cur[prop];
      } else {
        if (typeof(cur[prop]) === 'number') acc[prop] = cur[prop];
      }
    }

    return acc;
  }, {});
};

console.log(MaxValsOfProps(bitcoinData));

// Bonus 5.5
const MinValsOfProps = (arr) => {
  return arr.reduce((acc, cur) => {
    
    for (let prop in cur) {
      if (acc[prop] !== undefined) {
        if (acc[prop] > cur[prop]) acc[prop] = cur[prop];
      } else {
        if (typeof(cur[prop]) === 'number') acc[prop] = cur[prop];
      }
    }

    return acc;
  }, {});
};

console.log(MinValsOfProps(bitcoinData));

// Bonus 6
const rangeOfPropVals = (arr) => {
  const maxVals = MaxValsOfProps(bitcoinData);
  const minVals = MinValsOfProps(bitcoinData);
  
  return Object.fromEntries(Object.entries(maxVals).map(([key, maxVal]) => {
    return [key, [maxVal, minVals[key]]];
  }));
};

console.log(rangeOfPropVals(bitcoinData));

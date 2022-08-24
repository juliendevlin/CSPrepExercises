// POD Day 5 - Regular
function reverseInt(int) {
  let newInt = 0;

  while (int > 0) {
    newInt = (newInt * 10) + (int % 10);
    int = Math.floor(int / 10);
  }

  return newInt;
}

// POD Day 5 - Advanced
function commonElements(arrOfArrs){
  let output = arrOfArrs[0];
  let rest = arrOfArrs.slice(1);
  
  while (rest.length) {
    const newArr = [];

    output.forEach(el => {
      if (rest[0].includes(el) && !newArr.includes(el)) newArr.push(el);
    });
  
    output = newArr;
    rest = rest.slice(1);
  }
  return output;
}

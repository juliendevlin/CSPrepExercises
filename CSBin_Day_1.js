// http://csbin.io/cs-prep-unit-1/YOUR-UNIQUE-ROOM-NAME

////////////////////////////
//     Challenge 1
////////////////////////////

const printDriverHeight = () => console.log('5\'8"');

// Uncomment the line below to test your code
printDriverHeight();
// should print the driver's height


////////////////////////////
//     Challenge 2
////////////////////////////

const printNavigatorName = () => console.log('Julien');

// Uncomment the line below to test your code
printNavigatorName();
// should print the navigator's name


////////////////////////////
//     Challenge 3
////////////////////////////

const printName = (name) => console.log(name);
printName('Julien');

// When you run your code, it should print the driver's name followed by the navigator's name


////////////////////////////
//     Challenge 4
////////////////////////////

const printGroupName = (driverName, navigatorName) => {
  console.log(`${driverName} and ${navigatorName}`);
};

// Uncomment the line below to test your code
printGroupName('Sonny', 'Cher');
// should print 'Sonny and Cher'


////////////////////////////
//     Challenge 5
////////////////////////////

const multiplyHeight = (driverHeight, navigatorHeight) => {
  return driverHeight * navigatorHeight;
};

// Uncomment the line below to test your code
console.log('Challenge 5:', multiplyHeight(66, 72) === 4752);
// should print 'Challenge 5: true'


////////////////////////////
//     Challenge 6
////////////////////////////

const square = number => number**2;

// Uncomment the line below to test your code
console.log('Challenge 6:', square(3) === 9 && square(-4) === 16);
// should print 'Challenge 6: true'


////////////////////////////
//     Challenge 7
////////////////////////////

const getArea = radius => 3.14 * square(radius);

// Uncomment the line below to test your code
console.log('Challenge 7:', getArea(5) === 78.5);
// should print 'Challenge 7: true'


////////////////////////////
//     Challenge 8
////////////////////////////

const greeting = (name, casual) => {
  if (casual) console.log(`Hey ${name}`);
  else console.log(`Hello ${name}`);
};

greeting('Julien', true);
greeting('Julien', false);

// When you run it, it should print the following:
// Hey followed by the navigator's name
// Hello followed by the driver's name


////////////////////////////
//     Challenge 9
////////////////////////////

const isCodesmithOpen = time => {
  if (time > 9) console.log('Codesmith is open.');
  else console.log('Sorry, Codesmith is closed.');
};

// Uncomment the lines below to test your code
isCodesmithOpen(10);
isCodesmithOpen(9);
// should print 'Codesmith is open.'
// followed by 'Sorry, Codesmith is closed.'


////////////////////////////
//     Challenge 10
////////////////////////////

const smallMediumOrLarge = howHungry => {
  if (howHungry === 5) console.log('Large please!');
  else if (howHungry >= 3) console.log('Medium please!');
  else console.log('Small please!');
};

// Uncomment the lines below to test your code
smallMediumOrLarge(5);
smallMediumOrLarge(4);
smallMediumOrLarge(3);
smallMediumOrLarge(2);
smallMediumOrLarge(1);
// should print 'Large please!'
// followed by 'Medium please!' twice
// followed by 'Small please!' twice


////////////////////////////
//     Challenge 11
////////////////////////////

const isAGoodBoy = (wellBehaved, isCute) => {
  if (wellBehaved && isCute) console.log('pet');
  else console.log('train');
};

// Uncomment the lines below to test your code
isAGoodBoy(true, true);
isAGoodBoy(true, false);
isAGoodBoy(false, true);
isAGoodBoy(false, false);
// Should print pet, train, train, train


////////////////////////////
//     Challenge 12
////////////////////////////

const shouldEatBanana = (color, smellsGood) => {
  if (color === 'yellow' && smellsGood) console.log('eat');
  else if (color === 'green') console.log('wait');
  else console.log("don't eat");
};

// Uncomment the lines below to test your code
shouldEatBanana('yellow', true);
shouldEatBanana('yellow', false);
shouldEatBanana('green', true);
shouldEatBanana('green', false);
shouldEatBanana('red', true);
// Should print 'eat', "don't eat", 'wait', 'wait', "don't eat"


////////////////////////////
//     Challenge 13
////////////////////////////

const countTo5 = () => {
  for (let i = 1; i < 6; i++) {
    console.log(i);
  }
};

// alt solution if expected result is a single string

const countTo5InOneStr = () => {
  let countStr = '';
  
  for (let i = 1; i < 6; i++) {
    if (!countStr) countStr += i;
    else countStr += `, ${i}`;
  }
  
  console.log(countStr);
};

// Uncomment the line below to test your code
countTo5();
countTo5InOneStr();
// should print '1, 2, 3, 4, 5'


////////////////////////////
//     Challenge 14
////////////////////////////

const countMost = () => {
  for (let i = 1; i < 6; i++) {
    if (i !== 3) console.log(i);
  }
};

// alt solution if expected result is a single string

const countMostInOneStr = () => {
  let countStr = '';
  
  for (let i = 1; i < 6; i++) {
    if (!countStr && i !== 3) countStr += i;
    else if (i !== 3) countStr += `, ${i}`;
  }
  
  console.log(countStr);
};

// Uncomment the line below to test your code
countMost();
countMostInOneStr();
// should print '1, 2, 4, 5'

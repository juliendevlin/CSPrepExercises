////////////////////////////
//     Challenge 1
////////////////////////////

const myObj = {
	foo: 'hello',
	bar: 'world',
	baz: true
}

////////////////////////////
//     Challenge 2
////////////////////////////

const myNestedObj = {
  outer : 'outer value',
  innerObj :  {
    inner : 'inner value'
  }
}

console.log(myNestedObj.innerObj.inner)

////////////////////////////
//     Challenge 3
////////////////////////////

const team = {
  partner1: 'Jackson',
  partner2: 'Julien'
}

function sayTeamNames(teamObj) {
  console.log(`${teamObj.partner1} and ${teamObj.partner2}`);
}

sayTeamNames(team);

////////////////////////////
//     Challenge 4
////////////////////////////

const myLoopedObj = {
  key1: 'wow',
  key2: 'you',
  key3: 'did',
  key4: 'it!'
};

for(let key in myLoopedObj){
  console.log(myLoopedObj[key]);
}

////////////////////////////
//     Challenge 5
////////////////////////////

console.log(Math.floor(1.5));
console.log(Math.floor(2.3));
console.log(Math.ceil(1.5));
console.log(Math.ceil(2.3));
console.log(Math.random());
console.log(Math.random());
console.log(Math.sign(-14));
console.log(Math.sign(14));
console.log(Math.max(10, 3));
console.log(Math.min(3, 1, 44));
console.log(Math.pow(4, 2));

////////////////////////////
//     Challenge 6
////////////////////////////

const myFirstArr = [1, 2, 3];

////////////////////////////
//     Challenge 7
////////////////////////////

const someArray = [0,1,2,3,4,'you found me!'];
console.log(someArray[someArray.length - 1]);

////////////////////////////
//     Challenge 8
////////////////////////////

for(let i=0; i<someArray.length; i++){
  console.log(someArray[i]);
}

////////////////////////////
//     Challenge 9
////////////////////////////

const wordArr = ['i', 'have', 'some', 'stings', 'inside', 'me'];
for (let word of wordArr) {
  console.log(word);
}

////////////////////////////
//     Challenge 10
////////////////////////////

const changeMe = ['shiftMe', 'leaveMe', 'popMe'];

// call the array methods, then uncomment the last line to check your answer
// call pop and log the result

changeMe.pop();
console.log(changeMe);

// call push with the string "pushMe"

changeMe.push('pushMe');
console.log(changeMe);

// call shift and log the result

changeMe.shift();
console.log(changeMe);

// call unshift with the string "unshiftMe"

changeMe.unshift('unshiftMe');
console.log(changeMe);

////////////////////////////
//     Challenge 11
////////////////////////////

const a = [1,2,3];
const b = a;
console.log("array a is equal to array b?", a == b) // what will this return?
const c = [1,2,3];
console.log("array a is equal to array c?", a == c) // what will this return?
const d = a.slice();
console.log("array a is equal to array d?", a == d) // what will this return?

const sliceMe = ["first","half", "second", "half"];
const firstHalf = sliceMe.slice(0, 2);
const secondHalf = sliceMe.slice(2, sliceMe.length);
console.log(firstHalf);
console.log(secondHalf);

////////////////////////////
//     Challenge 12
////////////////////////////

const arrA = [0,1,"remove me!", 2, 3];
arrA.splice(2,1);
console.log(arrA);

arrA.splice(1,1,"one");
console.log(arrA);

// fix the arrays
const numCount = [0, 1, "two", "three", 4];
const wordCount = ["zero", "one", 2, 3, "four"];

numCount.splice(2, 2, 2, 3);
console.log(numCount);

wordCount.splice(0, 2, 0, 1);
wordCount.splice(4, 1, 4);
console.log(wordCount);

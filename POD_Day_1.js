// https://replit.com/teams/join/tvupuxcgncnrlnscvexrtkfxlhjqewbv-CsPrepDay1

// regular
// input: string
// output: returns reversed string
function reverseString(string) {
  // declare a variable and assign it an empty string
  let reversedString = '';
  
  // iterate through input string, from last character to first
    // add current element to our created variable
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }

  // return the reversed string
  return reversedString;
}

console.log('Challenge 1:', reverseString("codesmith prep") === "perp htimsedoc" ? "Correct!" : "Try again!");

// advanced 
// input: number
// output: prints staircase 
function drawStairs(n) {
  // if n is smaller than 1 or bigger than 100
    // log an error to the console
    // return
  if (n < 1 || n > 100) {
    console.log('error :( argument must be between 1 and 100');
    return;
  }

  // declare a chars variable and assign it to a string containing 1 asterisk
  // declare a spaces variable and assign it to a string containing n - 1 spaces
  let chars = '*';
  let spaces = ' '.repeat(n - 1);

  // while chars' length is smaller than n plus 1
    // log to the console spaces plus chars
    // reassign chars to itself plus one asterisk
    // reassign spaces to a slice of itself, with one less space
  while (chars.length < n + 1) {
    console.log(spaces + chars);
    chars += '*';
    spaces = spaces.slice(1);
  }
}

drawStairs(5);
drawStairs(101);
drawStairs(0)

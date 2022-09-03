// define function to delay program execution
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  while (currentDate - date < milliseconds) {
    currentDate = Date.now();
  }
}

// define player class
class Player {
  constructor(name, score = 0) {
    this.name = name;
    this.score = score;
    this.hand = [];
  }
  increment() {
    this.score++;
  }
}

// welcome + description of war
alert('Have you ever wanted to challenge a friend or foe but know nothing about cards?');
sleep(3000);
alert('');
alert('Welcome to CS Prep 77A Saddle Brown\'s luck-based card game WAR!');
sleep(3000);
alert('');
alert('This game must have 2 to 4 players. Playing cards from a shuffled deck will be distributed to each player. Each round the player will be asked to add a card to the table pile (playing field) or surrender. The player who places the playing card with the highest value amongst the other cards in the table pile wins the round. This player then adds all the cards on the table to their hand and the next round with initiate. The player in possession of all the playing cards in the deck wins the game. A tie situation will initiate WAR. In the WAR sequence, each player will draw a card face down and a card face up, winner take all.');
sleep(8000);

// get number of players. 
alert('');
const numberOfPlayers = Number(prompt('How many players will be playing?'));

while (typeof (numberOfPlayers) === NaN) {
  numberOfPlayers = Number(prompt('Please enter number of players.'));
}

// create player objects to keep track of names + overall scores + hands?
let inactivePlayers = [];
const players = []
for (let i = 1; i <= numberOfPlayers; i++) {
  const name = prompt(`What is player ${i}'s name?'`);
  players.push(new Player(name)); 
}

// start game loop
let playAgain = true;
while (playAgain === true) {

  // reset players array & rest everyone's hands to empty
  inactivePlayers.forEach(inactivePlayer => {
    players.push(inactivePlayer);
  }); 
  inactivePlayers = []; 
  
  players.forEach(player => {
    player.hand = [];
  });

  // display scoreboard
  alert('')
  alert('//////////////////')
  alert('SCOREBOARD');
  players.forEach(player => {
    alert(`${player.name}: ${player.score}`);
  });
  alert('//////////////////')
  alert('')

  // create deck
  const deck = {
    'Ace of spades': 14,
    'Ace of diamonds': 14,
    'Ace of hearts': 14,
    'Ace of clubs': 14,
    '2 of spades': 2,
    '2 of diamonds': 2,
    '2 of hearts': 2,
    '2 of clubs': 2,
    '3 of spades': 3,
    '3 of diamonds': 3,
    '3 of hearts': 3,
    '3 of clubs': 3,
    '4 of spades': 4,
    '4 of diamonds': 4,
    '4 of hearts': 4,
    '4 of clubs': 4,
    '5 of spades': 5,
    '5 of diamonds': 5,
    '5 of hearts': 5,
    '5 of clubs': 5,
    '6 of spades': 6,
    '6 of diamonds': 6,
    '6 of hearts': 6,
    '6 of clubs': 6,
    '7 of spades': 7,
    '7 of diamonds': 7,
    '7 of hearts': 7,
    '7 of clubs': 7,
    '8 of spades': 8,
    '8 of diamonds': 8,
    '8 of hearts': 8,
    '8 of clubs': 8,
    '9 of spades': 9,
    '9 of diamonds': 9,
    '9 of hearts': 9,
    '9 of clubs': 9,
    '10 of spades': 10,
    '10 of diamonds': 10,
    '10 of hearts': 10,
    '10 of clubs': 10,
    'Jack of spades': 11,
    'Jack of diamonds': 11,
    'Jack of hearts': 11,
    'Jack of clubs': 11,
    'Queen of spades': 12,
    'Queen of diamonds': 12,
    'Queen of hearts': 12,
    'Queen of clubs': 12,
    'King of spades': 13,
    'King of diamonds': 13,
    'King of hearts': 13,
    'King of clubs': 13
  }

  // shuffle deck
  let shuffledDeck = Object.keys(deck).sort(function() {
    return Math.random() - 0.5;
  });

  // distribute cards
  while (shuffledDeck.length) {
    players.forEach(player => {
      if (shuffledDeck.at(-1) !== undefined) {
        player.hand.push(shuffledDeck.pop());
      }
    });
  }

  // start turn loop
  let roundCount = 0;
  while (players.length > 1) {
    roundCount++;
    
    // display how many cards everyone has
    players.forEach(player => {
      alert(`${player.name} has ${player.hand.length} cards.`);
    });
    alert('')

    // prompt for the current turn to have everyone put a card down
    let playerChoice = confirm('Ready to place your cards?');

    while (!playerChoice) {
      playerChoice = confirm('Put your cards down dammit or your soul will be removed!!');
    }
    
    // line break to space out each round a little
    alert('');
    alert('-------------------------------------------------------------------------------------');
    alert(`                     ROUND ${roundCount}   MAY THE ODDS BE IN YOUR FAVOR`);
    alert('-------------------------------------------------------------------------------------');
    alert('');
    sleep(2000);
    let table = [];

    // have each player put a card down
    players.forEach(player => {
      alert(`${player.name} played ${player.hand[0]}.`);
      table.push(player.hand.shift());
    });
    alert('');
    sleep(2000);
    
    // determine winner
    let winningIndexes;
    let highestValue = -Infinity;

    table.forEach((card, index) => {
      if (deck[card] > highestValue) {
        highestValue = deck[card];
        winningIndexes = [index];
      }
      else if (deck[card] === highestValue) {
        winningIndexes.push(index);
      }
    });

    // enter war loop for as long as there is a tie
    while (winningIndexes.length > 1) {
      // iterate over players array to access name key in each property of each player element. Add this value to string variable to declare war
      let playersAtWarArr = [];
      players.forEach((player, index) => {
        if (winningIndexes.includes(index)) {
          playersAtWarArr.push(player.name);
        }
      })
      let playersAtWarrStr = playersAtWarArr.join(' and ')
      alert('           ================   ' + playersAtWarrStr + ' ARE AT WAR!!!!'+ '   ================           ')
      alert("")
      sleep(2000)
      const warTable = [];

      // each player at war plays two cards
      players.forEach((player, index) => {
        if (winningIndexes.includes(index)) {
          if (player.hand.length > 1){
            alert(`${player.name} played a card face down.`);
            warTable.push(player.hand.shift());
            alert(`${player.name} played ${player.hand[0]} face up.`);
            warTable.push(player.hand.shift());
          } else if (player.hand.length === 1){
            alert(`${player.name} played ${player.hand[0]} face up.`);
            warTable.push(null);  
            warTable.push(player.hand.shift());
          } else {
            alert(`${player.name} has no cards left to play war!`)
            warTable.push(null);
            warTable.push(null);
          }
        }
      });
      sleep(2000)
      alert('')

      highestValue = -Infinity;
      let indexTracker = 0;
      let winningWarIndexes;

      // find who placed the highest value card and won war
      // or loop back if there is still a tie
      warTable.forEach((card, index) => {
        if (index % 2 !== 0) {
          if (deck[card] > highestValue) {
            highestValue = deck[card];
            winningWarIndexes = [winningIndexes[indexTracker]];
          }
          else if (deck[card] === highestValue) {
            winningWarIndexes.push(winningIndexes[indexTracker]);
          }
          indexTracker++
        }
      });
      winningIndexes = winningWarIndexes;
      table.push(...warTable);
    }

    // declare winner
    alert(`${players[winningIndexes[0]].name} wins the round!`)
    alert('')
    sleep(2000)

    // push the cards everyone put down to the winners hand
    players[winningIndexes].hand.push(...table.sort(function() {
      return Math.random() - 0.5;
    }));

    // if anyone has no cards left they are out until the next game initiates
    players.forEach((player, index) => {
      if (!player.hand.length) {
        alert(`${player.name} is out of the game!`);
        inactivePlayers.push(...players.splice(index, 1));
      }
    });
    alert('')
  }

  // declare overall winner and increment score
  alert(`${players[0].name} is the victor!`);
  players[0].increment();

  // prompt to play another game
  playAgain = confirm('Would you like to play again?');
}

// say bye
alert('Thanks for playing WAR.');

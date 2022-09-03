class Game {
  constructor() {
    this.playAgain = true;
    this.players = {};
    this.inactive = {};
    this.turnCount = 1;
  }

  // prompts user to create new player properties based on how many player properties already exist within the players object
  addPlayers() {
    if (this.playerCount() === 4) {
      alert('You are already at the maximum (4) amount of players.');
      alert('');
    } 
    else if (this.playerCount() === 3) this.initializePlayers(1);
    else if (this.playerCount() === 2) this.initializePlayers(this.getNumberOfPlayers(1, 2));
  }

  // iterates through the players object to update each player's isDead property based on whether their playerStack is empty or not
  checkCasualties() {
    this.forEachPlayer(player => player.checkDead());
  }

  // prompts user to update playAgain property
  checkPlayAgain() {
    alert('Do you want to play another round of WAR?');
    alert('');
    confirm('') ? this.playAgain = true : this.playAgain = false;
    alert('');
  }

  // iterates through players object
  // updates player's atWar property if the value of a player's last played card is equals to highest value played on a given turn
  checkWar() {
    const highestCardValue = this.highestCardValue();

    this.forEachPlayer(player => {
      if (!player.isDefeated()) {
        if (deck.cardValue(player.lastPlayedCard()) === highestCardValue) player.atWar = true;
      }
    });
  }

  // returns an array containing all elements within the inPlayStack property of all player objects in players
  // resets the inPlayStack property of all player objects in players to an empty array
  collectCardsInPlay() {
    return this.reducePlayers((acc, cur) => {
      acc.push(...cur.inPlayStack);
      cur.inPlayStack = [];
      return acc;
    }, []);
  }

  // prompts player to start turn or initiate a surrender
  // returns if there are no longer any players that can surrender and the round is won 
  confirmTurn() {
    alert('Ready to go to battle?\n  (y) To battle!\n  (n) Surrender!\n');
    let playerReady = confirm('');
    alert('');
    
    while (!playerReady) {
      this.surrender();
      if (this.isRoundWon()) break;
      alert('Ready to go to battle?\n  (y) To battle!\n  (n) Surrender!');
      playerReady = confirm('');
      alert('');
    }
  }
  
  // prompts player to start war or initiate a surrender
  // returns if there are no longer any players that can surrender and war is won
  confirmWar() {
    alert('Ready to go to WAR?\n  (y) To battle!\n  (n) Surrender!\n');
    let playerReady = confirm('');
    alert('');
    
    while (!playerReady) {
      this.surrender(true);
      if (!this.isWar()) break;
      alert('Ready to go to WAR?\n  (y) To battle!\n  (n) Surrender!');
      playerReady = confirm('');
      alert('');
    }
  }
  
  // takes deck object as argument
  // deals cards from deck object to each player property in the players object
  dealCards(deck) {
    while (deck.length) {
      this.forEachPlayer(player => {
        if (deck.length) player.playerStack.push(deck.pop());
      });
    }
  }

  // returns an array containing the player object(s) with largest score property
  determineOverallWinners() {
    let bestScore = -Infinity;

    return this.reducePlayers((acc, cur) => {
      if (cur.score > bestScore) {
        bestScore = cur.score;
        return [cur];
      }
      else if (cur.score === bestScore) {
        acc.push(cur);
        return acc;
      }
      else return acc;
    }, []);
  }

  // iterates through players object to find the player property that has not been defeated
  // displays them as the round winner and increments their score
  determineRoundWinner() {
    this.forEachPlayer(player => {
      if (!player.isDefeated()) {
        alert(`${player.name} is the victor and has won the round!`);
        alert('');
        player.incrementScore();
      }
    });
  }

  // if the round is still ongoing, distributes all cards in play to the player who won the turn and announces them as the turn winner
  // otherwise announces that there is no one left to contest the turn winner for the round
  determineTurnWinner() {
    if (!this.isRoundWon()) {
      this.forEachPlayer(player => {
        if (player.atWar) {
          player.playerStack.push(...this.shuffle(this.collectCardsInPlay()));
          alert(`${player.name} wins the battle and captures all soldiers in play!`);
        }
      });
    }
    else alert(`${this.filterPlayers(player => !player.isDefeated()).name} is the only player left standing!`);
    alert('');
  }

  // if there is still a war, resets the atWar status of player(s) that do not have the highest value card in play
  // otherwise announces that there is no one left to contest the current war winner
  determineWarWinner() {
    if (this.isWar()) {
      const highestCardValue = this.highestCardValue(true);
  
      this.forEachPlayer(player => {
        if (!player.isDefeated() && player.atWar) {
          if (deck.cardValue(player.lastPlayedCard()) < highestCardValue) player.atWar = false;
        }
      });
    }
    else alert(`There is no one left for ${this.filterPlayers(player => player.atWar).name} to go to war with!`);
    alert('');
  }

  // display the overall winner(s) of the game
  displayOverallWinners() {
    const winners = this.determineOverallWinners();

    if (winners.length > 1) {
      let winnersString = winners.reduce((acc, cur, i, winners) => {
        if (i === 0) return acc + cur.name;
        else if (i === winners.length - 1) return acc + ` and ${cur.name}`;
        else return acc + `, ${cur.name}`;
      }, '');

      alert(`The WAR is a stalemate between ${winnersString}!`);
    }
    else alert(`The winner of WAR is ${winners[0].name}!`);
    alert('');
  }

  // display playerStack property size for each player
  displayPlayerStackSizes() {
    this.forEachPlayer(player => player.displayPlayerStackSize());
    alert('');
  }

  // displays each player's score in descending order
  displayScoreboard() {
    alert();
    alert('//////////////////////////////');
    alert('SCOREBOARD');
    this.sortPlayersByScore().forEach(player => alert(`${this.players[player].name}: ${this.players[player].score}`));
    alert('//////////////////////////////');
    alert();
  }

  // displays the turn count for the current round
  displayTurnCount() {
    alert('---------' + '-'.repeat(this.turnCount.toString().split('').length));
    alert(` BATTLE ${this.turnCount}`);
    alert('---------'+ '-'.repeat(this.turnCount.toString().split('').length));
  }

  // displays that war has been initiated
  displayWar() {
    alert(' --WAR!--');
  }

  // displays the rules of the game of war
  displayWarInstructions() {
    alert('Have you ever wanted to challenge a friend or foe but know nothing about cards?');
    alert('Welcome to WAR!');
    alert('');

    alert('Each player will be delt an equal amount of cards. Each turn, all players play a card from the top of their stack. The highest card played wins all cards on the table.');
    alert('');

    alert('A tie initiates WAR. Players at WAR will draw a card face down and a card face up, comparing face up cards until a winner is determined. The winner take all the spoils of WAR.');
    alert('');

    alert('The player who gets all cards wins the round!');
    alert('');
  }

  // display exit message
  exit() {
    alert('Thanks for playing WAR!');
    alert('See you on the battlefield next time.');
  }

  // returns a single player object that meets a given condition
  filterPlayers(cb) {
    for (let player in this.players) {
      if (cb(this.players[player])) return this.players[player];
    }
  }

  // iterate through each player object in the inactive property
  forEachInactive(cb) {
    for (let player in this.inactive) {
      cb(this.inactive[player]);
    }
  }
  
  // iterate through each player object in the players property
  forEachPlayer(cb) {
    for (let player in this.players) {
      cb(this.players[player]);
    }
  }
  
  // returns a number of players to create based on user input within a min-max range
  getNumberOfPlayers(min, max) {
    if (min < 1) throw new Error('Invalid argument min. min cannot be less than 1.');
    if (max < min) throw new Error('Invalid arguments. argument min must be lesser than argument max.');
    if (typeof (min) !== 'number' || typeof (max) !== 'number') throw new Error('Invalid arguments. Arguments must be numbers.');

    let userInput = prompt(`Please enter the number of players (${min}-${max}).`);
    while (Number.isNaN(Number(userInput)) || Number(userInput) < min || Number(userInput) > max) {
      userInput = prompt(`'${userInput}' is not a valid input. Please enter a number from ${min} to ${max}.`);
    }
    return Number(userInput);
  }

  // returns the highest value number of the cards currently in play
  // takes an optional parameter true if the comparison is to be done between only players who are at war
  // or default false if the comparison is to be done between all players who are not yet defeated
  highestCardValue(atWarStatus = false) {
    return this.reducePlayers((acc, cur) => {
      if (!cur.isDefeated() && cur.atWar === atWarStatus) {
        if (deck.cardValue(cur.lastPlayedCard()) > acc) return deck.cardValue(cur.lastPlayedCard());
        else return acc;
      }
      else return acc;
    }, -Infinity);
  }

  // returns number of player properties in inactive object
  inactiveCount() {
    return Object.keys(this.inactive).length;
  }
  
  // creates individual player objects based on number passed in and user input
  initializePlayers(numberOfPlayers) {
    let newPlayerKey;
    let allPlayerKeys = [...Object.keys(this.players), ...Object.keys(this.inactive)];
    
    if (this.players['1'] || this.inactive['1']) newPlayerKey = Math.max(...allPlayerKeys.map(el => Number(el))) + 1;
    else newPlayerKey = 1;
    
    for (let i = newPlayerKey; i < newPlayerKey + numberOfPlayers; i++) {
      let name = prompt(`What is player ${i}'s name?'`);

      allPlayerKeys = [...Object.keys(this.players), ...Object.keys(this.inactive)];
      
      const allPlayerNames = allPlayerKeys.map(playerKey => {
      if (this.players[playerKey]) return this.players[playerKey].name;
      else return this.inactive[playerKey].name;
      });
      
      while (!name || allPlayerNames.includes(name)) {
        if (!name) name = prompt('Please enter a name.');
        else if (allPlayerNames.includes(name)) name = prompt('Name already exits. Please choose different name.');
      }

      this.players[i] = new Player(name);
    }
    alert('');
  }
  
  // returns boolean based on whether only one player has cards left in their playerStack
  isRoundWon() {
    const playersNotDefeated = this.reducePlayers((acc, cur) => {
      if (!cur.isDefeated()) return acc + 1;
      else return acc;
    }, 0);

    return !(playersNotDefeated > 1);
  }

  // returns boolean based on whether only one player has an atWar status set to true
  isWar() {
    const playersAtWar = this.reducePlayers((acc, cur) => {
      if (cur.atWar) return acc + 1;
      else return acc;
    }, 0);
    return playersAtWar > 1;
  }

  // logs all player objects from the players property for testing purposes
  logAllPlayerObjects() {
    for (let player in this.players) {
      console.log(this.players[player]);
    }
  }

  // returns number of player properties in players object
  playerCount() {
    return Object.keys(this.players).length;
  }

  // prompts user to move player properties in the inactive object to the players object
  reactivatePlayer() {
    if (this.playerCount() === 4) {
      alert('You are already at the maximum (4) amount of players.');
      alert('');
    }
    else if (!this.inactiveCount()) {
      alert('There are no inactive players to reactivate.');
      alert('');
    }
    else {
      alert('Which player would you like to reactivate?');
      
      this.forEachInactive(player => {
        alert(`  ${player.name}`);
      });
      
      let activateInput = prompt('');
      alert('');

      let playerToActivate = Object.keys(this.inactive).filter(playerKey => {
        return this.inactive[playerKey].name === activateInput;
      })[0];

      if (playerToActivate) {
        this.players[playerToActivate] = this.inactive[playerToActivate];
        delete this.inactive[playerToActivate];
        alert(`${activateInput} is now back in the game.`);
        alert('');
      }
      else alert(`'${activateInput}' is not a valid inactive player name.`);
      alert('');
    }
  }

  // reduces player properties in players object
  reducePlayers(cb, initialVal) {
    let acc;

    if (initialVal !== undefined) acc = initialVal;

    for (let player in this.players) {
      if (acc !== undefined) acc = cb(acc, this.players[player]);
      else acc = player;
    }

    return acc;
  }

  // prompt user to move player properties in the players object to the inactive object
  removePlayer() {
    if (this.playerCount() === 2) {
      alert('You are already at the minimum (2) amount of players.');
      alert('');
    }
    else {
      alert('Which player would you like to remove?');
      
      this.forEachPlayer(player => {
        alert(`  ${player.name}`);
      });
      
      let removeInput = prompt('');
      alert('');
  
      let playerToRemove = Object.keys(this.players).filter(playerKey => {
        return this.players[playerKey].name === removeInput;
      })[0];
  
      if (playerToRemove) {
        this.inactive[playerToRemove] = this.players[playerToRemove];
        delete this.players[playerToRemove];
        alert(`${removeInput} has been removed.`);
      }
      else alert(`'${removeInput}' is not a valid player name.`);
      alert('');
    }
  }

  // presents menu options for players to add, remove or reactivate previously removed players
  resetPlayers() {
    let userInput;

    while (userInput !== '4') {
      userInput = null;
      userInput = prompt('Would you like to:\n  (1) add new players\n  (2) reactivate previous player\n  (3) remove current player\n  (4) continue to the next round');
      alert('');
      
      if (userInput === '1') {
        this.addPlayers();
      }
      else if (userInput === '2') {
        this.reactivatePlayer();
      }
      else if (userInput === '3') {
        this.removePlayer();
      }
      else if (userInput === '4') continue;
      else {
        alert(`'${userInput}' is not a valid choice`);
        alert('');
      }
    }
  }

  // resets turn count, playerStacks properties and player isDead properties for all players
  resetRound() {
    this.turnCount = 1;
    this.forEachPlayer(player => {
      player.playerStack = [];
      player.isDead = false;
      player.isSurrendered = false;
    });
  }

  // resets player atWar property for all players, and increments turn count
  resetTurn() {
    this.turnCount++
    this.forEachPlayer(player => {
      player.atWar = false;
    });
  }

  // returns a shuffled array
  shuffle(cards) {
    return cards.sort(() => Math.random() - 0.5);
  }
  
  // returns array of player keys sorted by score in descending order
  sortPlayersByScore() {
    return Object.keys(this.players).sort((a, b) => {
      return this.players[b].score - this.players[a].score;
    });
  }

  // has each player put one card down
  startTurn() {
    if (!this.isRoundWon()) {
      this.forEachPlayer(player => {
        if (!player.isDefeated()) player.playOneCard();
      });
      alert('');
    }
    else return;
  }

  // has each player put down two cards
  startWar() {
    if (this.isWar()) {
      this.forEachPlayer(player => {
        if (!player.isDefeated()) player.playTwoCards();
      });
    alert('');
    }
    else return;
  }
  
  // allows players still in the game to forfeit the round, distributing their cards to remaining players evenly
  // takes an optional parameter true if the forfeiture is to be done during war, in which case cards are distributed to players at war
  // or default false if the forfeiture is to be done during a regular turn, in which case cards are distributed to all undefeated players
  surrender(atWarStatus = false) {
    if (this.isRoundWon()) {
      alert('Don\'t be foolish, there\'s no one left to surrender to!');
      alert('');
    }
    else {
      alert('Who will be laying down their arms?');
      
      this.forEachPlayer(player => {
        if (!player.isDefeated() && player.atWar === atWarStatus) {
          alert(`  ${player.name}`);
        }
      });
      
      let surrenderInput = prompt('');
      alert('');
  
      let playerToSurrender = Object.keys(this.players).filter(playerKey => {
        return this.players[playerKey].name === surrenderInput;
      })[0];
  
      if (playerToSurrender && this.players[playerToSurrender].atWar === atWarStatus) {
        let deserters = this.players[playerToSurrender].playerStack;
        this.players[playerToSurrender].playerStack = [];
        this.players[playerToSurrender].atWar = false;
        this.players[playerToSurrender].isSurrendered = true;

        while (deserters.length) {
          this.forEachPlayer(player => {
            if (!player.isDead && !player.isSurrendered && deserters.length) {
              player.playerStack.push(deserters.pop());
            }
          });
        }
        
        alert(`${surrenderInput} has surrendered. Their soldiers have deserted to enlist with the armies left standing.`);
        alert('');
        this.displayPlayerStackSizes();
      }
      else { 
        alert(`'${surrenderInput}' is not a valid player name.`);
        alert('');
      }
    }
  }
}

class Player {
  constructor(name, score = 0) {
    this.name = name;
    this.score = score;
    this.playerStack = [];
    this.inPlayStack = [];
    this.isDead = false;
    this.isSurrendered = false;
    this.atWar = false;
  }

  // update isDead status
  checkDead() {
    if (!this.hasCardsInStack() && !this.isDefeated()) {
      this.isDead = true;
      alert(`${this.name} is out of soldiers!`);
      alert('');
    }
  }

  // display how many cards player has in player stack
  displayPlayerStackSize() {
    if (this.hasCardsInStack()) {
      alert(`${this.name} has ${this.playerStack.length} soldiers left.`);
    }
    else if (this.isDead) {
      alert(`${this.name} has fallen in battle.`);
    }
    else if (this.isSurrendered) {
      alert(`${this.name} has laid down their arms.`);
    }
  }

  // check if player has cards in play
  hasCardsInPlay() {
    return !!this.inPlayStack.length;
  }

  // check if player has cards in their stack
  hasCardsInStack() {
    return !!this.playerStack.length;
  }
  
  // increment player score by 1
  incrementScore() {
    this.score++;
  }

  // returns whether player is either dead or has surrendered
  isDefeated() {
    return this.isDead || this.isSurrendered;
  }

  // return the last played card by a player
  lastPlayedCard() {
    return this.inPlayStack.at(-1);
  }

  // have player play one card
  playOneCard() {
    if (!this.isDefeated()) {
      this.inPlayStack.push(this.playerStack.shift());
      alert(`${this.name} sends ${this.inPlayStack.at(-1)} to battle.`);
    }
  }

  // have player play two cards if they are able, play one or none otherwise
  playTwoCards() {
    if (this.atWar && this.playerStack.length >= 2) {
      this.inPlayStack.push(this.playerStack.shift());
      alert(`${this.name} sends a hidden soldier to support the war.`);
      this.inPlayStack.push(this.playerStack.shift());
      alert(`${this.name} sends ${this.inPlayStack.at(-1)} to lead the war.`);
    }
    else if (this.atWar && this.playerStack.length === 1) {
      this.inPlayStack.push(this.playerStack.shift());
      alert(`${this.name} sends ${this.inPlayStack.at(-1)} to lead the war.`);
    }
    else if (this.atWar && this.playerStack.length === 0) {
      this.isDead = true;
      this.atWar = false;
      alert(`${this.name} has no soldiers left to go to war!`);
    }
  }
}

class Deck {
  constructor() {
    ['Hearts', 'Clubs', 'Diamonds', 'Spades'].forEach(suit => {
      for (let value = 2; value <= 14; value++) {
        if (value === 11) this[`Jack of ${suit}`] = value;
        else if (value === 12) this[`Queen of ${suit}`] = value;
        else if (value === 13) this[`King of ${suit}`] = value;
        else if (value === 14) this[`Ace of ${suit}`] = value;
        else this[`${value} of ${suit}`] = value;
      }
    });
  }

  // returns the value of a passed in card
  cardValue(card) {
    return this[card];
  }

  // returns a shuffled deck array
  shuffleDeck() {
    return Object.keys(this).sort(function() {
      return Math.random() - 0.5;
    });
  }
}

const game = new Game;
const deck = new Deck;

game.displayWarInstructions();
game.initializePlayers(game.getNumberOfPlayers(2, 4));

while (game.playAgain) {
  game.displayScoreboard();
  game.dealCards(deck.shuffleDeck());

  while (!game.isRoundWon()) {
    game.displayTurnCount();
    game.displayPlayerStackSizes();
    game.confirmTurn();
    game.startTurn();
    game.checkWar();

    while (game.isWar()) {
      game.displayWar();
      game.confirmWar();
      game.startWar();
      game.determineWarWinner();
    }

    game.determineTurnWinner();
    game.checkCasualties();
    game.resetTurn();
  }

  game.determineRoundWinner();
  game.resetRound();
  game.checkPlayAgain();
  if (game.playAgain) game.resetPlayers(); 
}

game.displayScoreboard();
game.displayOverallWinners();
game.exit();

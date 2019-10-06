//Array of words for the game

var gameWords = ["lavo", "marquee", "mirage", "schimanski", "tao"];


//function to get a random word from the array.

function randomWord(words) { 
  return words.[Math.floor(Math.random()* words.length)];
}


//check if words contains letter
function isCorrectGuess(word,letter){
  return word.indexOf(letter) >=0;
}

//function to generate array of blanks from word
function getBlanks(word){

//count number of letters in the word
var letterCount = word.length;

//create an array to store the number of blanks
var blanks = [];

//fill up the puzzle state list with appropriate number of blanks

for (var i = 0; i < letterCount; i++){
  blanks.push("_");
}

return blanks;
}

//function to update blanks array with given letter (checks word)

function fillBlanks(word,puzzleState, letter) {
  //loop through the word
  for (var i = 0; < word.length; i++) {
    if(word[i] === letter) {
      puzzleState[i]= letter;
    }
  }

  return puzzleState;
}


//END UTILITY FUNCTION 

//BEGIN GAME MANAGEMENT
 


























// function to generate array of blanks from word
function getBlanks(word) {
  // count the number of letters in the word
  var letterCount = word.length;

  // Create an array to store the necessary number of blanks
  var blanks = [];

  // Fill up the puzzleState list with appropriate number of blanks
  // This is based on number of letters in solution
  for (var i = 0; i < letterCount; i++) {
    blanks.push("_");
  }

  return blanks;
}

// function to update blanks array with given letter (checks word)
function fillBlanks(word, puzzleState, letter) {
  // Loop through the word.
  for (var i = 0; i < word.length; i++) {
    // Populate the puzzleState with every instance of the letter.
    if (word[i] === letter) {
      // Here we set the specific space in blanks and letter equal to the letter when there is a match.
      puzzleState[i] = letter;
    }
  }

  return puzzleState;
}

/*************************************************************
 * End utility functions
 *************************************************************/

/*************************************************************
 * Begin functions for game management
 *************************************************************/

// setupRound new "round" - takes a word, creates and returns an object with the word, the blanks array equivalent, number of guesses, and an array of wrong guesses
function setupRound(word) {
  var blanks = getBlanks(word);

  return {
    word: word,
    guessesLeft: 9,
    wrongGuesses: [],
    puzzleState: blanks
  };
}

// all the code that needs to be run after each guess is made
function updateRound(round, letterGuessed) {
  // if the letter exists in the word
  if (isCorrectGuess(round.word, letterGuessed)) {
    // update based on the new puzzleState
    round.puzzleState = fillBlanks(round.word, round.puzzleState, letterGuessed);
  } else {
    // then we add the letter to the list of wrong letters, and we subtract one of the guesses.
    round.wrongGuesses.push(letterGuessed);
    round.guessesLeft -= 1;
  }
}

// check if word is complete
function hasWon(puzzleState) {
  return puzzleState.indexOf("_") === -1;
}

// check if lost
function hasLost(guessesLeft) {
  return guessesLeft === 0;
}

// check if round is over
function isEndOfRound(round) {
  return hasWon(round.puzzleState) || hasLost(round.guessesLeft);
}

// setupGame new "game" - create and return an object with the array of words, set wins + losses, generate a new round
function setupGame(words, wins, losses) {
  var round = setupRound(randomWord(words));

  return {
    words: words,
    wins: wins,
    losses: losses,
    round: round
  };
}

// update game state with win/loss info, trigger new setup
function startNewRound(game) {
  var currentRound = game.round;

  if (hasWon(currentRound.puzzleState)) {
    game.wins += 1;
    alert("You won! The word was " + currentRound.word);
  } else if (hasLost(currentRound.guessesLeft)) {
    game.losses += 1;
    alert("You lost :( The word was " + currentRound.word);
  }

  game.round = setupRound(randomWord(game.words));
}

// start the game
var myGame = setupGame(gameWords, 0, 0);

/*************************************************************
 * End game management functions
 *************************************************************/

/*************************************************************
 * Begin page management functions
 *************************************************************/

// function to update page with all relevant values
function updatePage(game) {
  document.getElementById("guesses-left").innerHTML = game.round.guessesLeft;

  // This will print the array of guesses and blanks onto the page.
  document.getElementById("puzzle-state").innerHTML = game.round.puzzleState.join(" ");

  // This will print the wrong guesses onto the page.
  document.getElementById("wrong-guesses").innerHTML = game.round.wrongGuesses.join(" ");

  // This will print the # wins onto the page
  document.getElementById("win-counter").innerHTML = game.wins;

  // This will print the # losses onto the page
  document.getElementById("loss-counter").innerHTML = game.losses;
}

// function to handle keypress
document.onkeyup = function handleKeypress(event) {
  // Check if the key pressed is a letter
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    // Converts all key clicks to lowercase letters
    var letterGuessed = event.key.toLowerCase();

    // use letter guessed and last known round state to generate new game state
    updateRound(myGame.round, letterGuessed);

    // check if win/loss condition is met, and alert/end gameState, choose new word, and update page
    if (isEndOfRound(myGame.round)) {
      startNewRound(myGame);
    }

    // update what's shown on the page
    updatePage(myGame);
  }
};

// on page load, set up info
updatePage(myGame);

/*************************************************************
 * End page management functions
 *************************************************************/




















//PREVIOUS CODE
// function randomWord(words){
//   var randomNumber = Math.floor(Math.random() * words.length)
//   return words[randomNumber]
// }

// // 1.2 - isCorrectGuess function

// function isCorrectGuess (word, letter) { 
//   for (var i = 0; i < word.length; i++) {
//   //our code
//     if (word[i] === letter){
//       return true;
//     }
//   } 
//   return false; 
// }

// // 1.3 getBlanks

// // word = "hot"
// // blanks = ["_","_","_"]
// // puzzleState = ["_","o","t"]

// function getBlanks (word){
// //  create an array 
// //  iterate through the word
// //  for each iteration push "_" into the array you created
// //  return the array

//   var blank = [];
//   for (var i = 0; i < word.length; i++) {
//     blank.push("_")
//   }
//   return blank;
// }


// // var myblanks = getBlanks("hot")


// // 1.4 FillBlanks.
// // The final "utility" you'll need is one which will fill a blanks array in the correct locations given a letter and the word that array was built from.
// // For example:
// // // returns ["h", "_", "_", "_", "_"]
// // fillBlanks("hello", ["_", "_", "_", "_", "_"], "h");

// // // returns ["_", "e", "l", "l", "_"]
// // fillBlanks("hello", ["_", "e", "_", "_", "_"], "l");
// // Name your function fillBlanks, and have it take three arguments: the word string, the array of the current puzzle state, and the letter that is going to be filled in (arguments in that order).

// // word = "hot"
// // blanks = ["_","_","_"]
// // puzzleState = ["h","o","_"]
// // letter = "k"


// function fillBlanks (word, puzzleState, letter){
//     for (var i=0  ; i < word.length; i++){
//         if (word[i] === letter) {
//             puzzleState[i] = letter;
//         } 
//     }
//     return puzzleState;
// }


// // 1.5 setupRound function

// // To start the game logic, you're going to need a way to track all of the information associated with an individual "round" of the game.
// // Create function named setupRound which will be used to create the "round" object. It should take a single argument: the word.
// // The function should return an object with the following properties and values:

// // word - set to the word passed in as an argument

// // guessesLeft - set to 9 to start

// // wrongGuesses - an empty array to start (since there haven't been any guesses yet)

// // puzzleState - array of blanks representation of word to start. You can update this later when someone makes a correct guess.

// // For this and the following functions, think about how you can use functions we've already created!
// // has the 'puzzleState' prop set to blanks array based on argument 

// function setupRound (word){

//   var round = { 
//     word: word,
//     guessesLeft: 9,
//     wrongGuesses: [],
//     puzzleState: getBlanks(word)
//   } 
//   return round
// }

// // 1.6 - updateRound function
// // Now that you can create rounds, you want to be able to update that round every time the user guesses a letter.
// // Write a function named updateRound that takes two arguments: the round object and the string letter guessed.
// // This function should, based on the letter guessed, update all relevant aspects of the round object passed as an argument.

// //update the puzzleState depending on whether its a correct guess
// // var myRound = {
// //   word: "hello",
// //   guessesLeft: 5,
// //   wrongGuesses: ["a","t","g","r"],
// //   puzzleState: ["_","_","_","_"]
// // }


// function updateRound (round,letter){
//   if(isCorrectGuess(round.word, letter) === true){
//     fillBlanks(round.word, round.puzzleState, letter)
//   }
//   else {
//     round.guessesLeft--;
//     round.wrongGuesses.push(letter);
//   }
// }


// // 1.7 - hasWon function
// // To know when you need to start a new round, you're going to need to check if the game has been won or lost. Let's start with checking if the round has been won.
// // For this, use a function named hasWon, that takes the array puzzleState as the only argument.
// // How can you tell if the round has been won with this information?
// // The function should return true if the round is won, false otherwise.

// function hasWon (puzzleState) {
//   for (var i = 0; i < puzzleState.length; i++){
//     if (puzzleState[i] === "_"){
//       return false
//     }
//   }return true
  
// }

// // 1.8.8 - hasLost function
// // Next, use a function named hasLost to check if the round is lost. This function should take as the only argument the number guessesLeft.
// // How can you tell if the round has been lost with this information?
// // This function should return true if the round is lost, false otherwise.

// function hasLost (guessesLeft) {
//   for (var i = 0; i < guessesLeft.length + 1; i++){
//     if (guessesLeft[i] > 9){ 
//       return true
//     }
//   } return false
// }


// // 1.9 - isEndOfRound function
// // Finally, to allow us to know if you need to start a new round, create a function to check if the round is over. Name it isEndOfRound. It should take the round object as an argument, and return true if the round is over, and false otherwise.
// // You'll want to use this function later to trigger starting a new round.

// function isEndOfRound (round) {
  
// }
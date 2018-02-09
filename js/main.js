
// js test
console.log("Up and running!");


// initilise variables

var cards = [
{
rank: "queen",
suit: "hearts",
cardImage: "images/queen-of-hearts.png"
},
{
rank: "queen",
suit: "diamonds",
cardImage: "images/queen-of-diamonds.png"
},
{
rank: "king",
suit: "hearts",
cardImage: "images/king-of-hearts.png"
},
{
rank: "king",
suit: "diamonds",
cardImage: "images/king-of-diamonds.png"
}
];

var cardsInPlay = [];

var cardsInPlayData = [];

var totalScore = 0;

var matchSfx = new Audio("sounds/match.wav");

var lossSfx = new Audio("sounds/loss.wav");

var resetSfx = new Audio("sounds/reset.wav");


// create functions


var shuffle = function(array) {
	// this based on the Fisher-Yates Shuffle
	// had trouble writing my own
	// found this function at https://bost.ocks.org/mike/shuffle/compare.html
	// and moditfied to match learneds function creation. 
	// I would like to learn more about licenses and how to attribute correctly.
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
}

var createBoard = function () {
	shuffle(cards);
	for(i=0; i < cards.length; i += 1) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src','images/back.png');
		cardElement.setAttribute('data-id',i);
		cardElement.setAttribute('id','card' + i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
};


var createResetButton = function () {
	var buttonElement = document.getElementById('reset');
	buttonElement.addEventListener('click', resetBoard);
}

var updateScore = function () {
	var scoreTally = document.getElementById('score');
	scoreTally.textContent = "Score: " + totalScore.toString();

};

var setNotification = function(message) {
	var newNotification = document.getElementById('notification');
	newNotification.textContent = message;
};

var beep = function(sfx) {
  sfx.play();
}

var checkForMatch = function() {
	if (cardsInPlay.length === 2) {
		if (cardsInPlay[0] === cardsInPlay[1]) {
				setNotification("You found a match!");
				totalScore = totalScore + 50;
				updateScore();
				//beep(matchSfx);
				for (var i = 0; i < cardsInPlayData.length; i++) {
					var returnCard = document.getElementById(cardsInPlayData[i]);
					returnCard.removeEventListener('click', flipCard);
				}
				cardsInPlay = [];
				cardsInPlayData = [];
			} else {
				setNotification("Sorry, try again!");
				//beep(lossSfx);
				for (var i = 0; i < cardsInPlayData.length; i++) {
					var returnCard = document.getElementById(cardsInPlayData[i]);
					returnCard.setAttribute('src', 'images/back.png');
				}
				cardsInPlay = [];
				cardsInPlayData = [];
			};
		};
};


var flipCard = function() {
	var cardId = this.getAttribute('data-id');
	this.setAttribute('src',cards[cardId].cardImage);
	//console.log("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit);
	cardsInPlay.push(cards[cardId].rank);
	//console.log(this.id);
	cardsInPlayData.push(this.id);
	//console.log(cards[cardId].cardImage);
	//console.log(cards[cardId].suit);
	setTimeout(checkForMatch, 2000);
};


var resetBoard = function () {
	var gameBoard = document.getElementById('game-board');
		while (gameBoard.hasChildNodes()) {
			gameBoard.removeChild(gameBoard.firstChild);
	}
	totalScore = 0;
	updateScore();
	setNotification("Ready to play?");
	createBoard();
	//beep(resetSfx);
};


//get the game ready to play

createBoard();
createResetButton();
updateScore();
setNotification("Ready to play?");


const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
	constructor(name) {
		this.name = name;
		this.hand = [];
	}

	drawCard() {
		let randomCard = blackjackDeck[Math.floor(Math.random() * blackjackDeck.length)];
		this.hand.push(randomCard);
	}
}

// // CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer');
const player = new CardPlayer('Player');

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */

const calcPoints = (hand) => {

	// Set isSoft is false without Aces
	let isSoft = false;

	// Calculate total points
	let total = 0;
	hand.forEach((hand) => {
		total += hand.val;
	})

	// Count number of Aces in hand
	let aceExist = hand.filter((card) => card.displayVal === 'Ace');
	let numAces = aceExist.length;

	// For more than one Ace,
	if (numAces > 0) {

		// Calculate number of mandatory deductions from available Aces
		// with maximum of 1 Ace valued at 11 
		deductAllButOne = (numAces - 1) * 10;
		total -= deductAllButOne;

		if (total <= 21) {
			isSoft = true;
			// total = total;
		}
		if (total > 21) {
			// Apply optional deduction from last remaining Ace
			// isSoft = false; // All aces are 1
			total -= 10;
		}
	}
	return { total: total, isSoft: isSoft };
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */

const dealerShouldDraw = (dealerHand) => {

	let currentTotal = calcPoints(dealerHand).total;
	let isSoft = calcPoints(dealerHand).isSoft;

	// If hand is 16 points or less, draw another card
	if (currentTotal <= 16) {
		return true;
		// Exactly 17 points, and an Ace valued at 11, draw another card
	} else if (currentTotal == 17 && isSoft == true) {
		return true;
		// 17 points or more, or total goes over 21, end
	} else {
		return false;
	}
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */

const determineWinner = (playerScore, dealerScore) => {
	// All points over 21 has been accounted for in startGame() script
	// Calculated points printed to console prior to this
	if (dealerScore < playerScore) {
		document.write(`Player wins.`);
		return `Player wins.`;
	} else if (dealerScore > playerScore) {
		document.write(`Dealer wins.`);
		return `Dealer wins.`;
	} else {
		document.write(`It's a tie.`);
		return `It's a tie.`;
	}
};

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
	return `Dealer showing ${dealerCard.displayVal} of value ${dealerCard.val}, your count is ${count}. Draw card?`;
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
let showHand = (player) => {
	let displayHand = player.hand.map((card) => card.displayVal);
	// Input onto HTML (does not automatically write due to prompt)
	document.write(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total}). <br>`);
	// Write to console
	console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}


/**
 * Runs Blackjack Game
 */
const startGame = function () {
	player.drawCard();
	dealer.drawCard();
	player.drawCard();
	dealer.drawCard();

	// Calculate Player's score 
	let playerScore = calcPoints(player.hand).total;
	showHand(player);

	// Calculate Dealer's score 
	let dealerScore = calcPoints(dealer.hand).total;

	// Show player's and dealer's hand of first 2 cards
	let playerFirstHand = player.hand.map((card) => card.displayVal);
	let dealerFirstHand = dealer.hand.map((card) => card.displayVal);

	// Write dealer's first hand into HTML before moving on
	document.write(`${dealer.name}'s hand is ${dealerFirstHand.join(', ')} (${dealerScore}). <br>`);

	// End game if Player or Dealer has 21 
	if (playerScore === 21 && dealerScore != 21) {
		document.write(`Player wins ! <br>`);
		// showhand() prints total and displayVal before this
		return `Player wins !`;
	} else if (dealerScore === 21 && playerScore != 21) {
		document.write(`Dealer wins!`);
		return `Dealer's hand is ${dealerFirstHand.join(', ')} (21). Dealer wins!`;
	} else if (dealerScore === 21 && playerScore === 21) {
		document.write(`Player's hand is ${playerFirstHand.join(', ')} (21) and Dealer's hand is ${dealerFirstHand.join(', ')} (21). It's a tie`);
		return `Player's hand is ${playerFirstHand.join(', ')} (21) and Dealer's hand is ${dealerFirstHand.join(', ')} (21). It's a tie`;
	}

	// Player's turn to draws if less than 21
	while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
		player.drawCard();
		playerScore = calcPoints(player.hand).total;
		showHand(player);
	}
	if (playerScore > 21) {
		document.write(`You went over 21 - you lose! <br>`);
		return `You went over 21 - you lose!`;
	}
	document.write(`Player stands at ${playerScore}. <br>`);
	console.log(`Player stands at ${playerScore}.`);

	// Dealer's turn to draw 
	while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
		dealer.drawCard();
		dealerScore = calcPoints(dealer.hand).total;
		showHand(dealer);
	}
	if (dealerScore > 21) {
		document.write(`Dealer went over 21 - you win! <br>`);
		return `Dealer went over 21 - you win!`;
	}
	document.write(`Dealer stands at ${dealerScore}. <br>`);
	console.log(`Dealer stands at ${dealerScore}.`);

	return determineWinner(playerScore, dealerScore);
}
console.log(startGame());
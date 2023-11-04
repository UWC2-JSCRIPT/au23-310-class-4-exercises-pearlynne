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
};

// // CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('dealer');
const player = new CardPlayer('player');

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */

const calcPoints = (hand) => {

	// Set isSoft as false with no Aces
	let isSoft = false;

	// Calculate total points
	let total = 0;
	hand.forEach((hand) => {
		total += hand.val;
	});

	// Create variable to find Ace in deck
	let aceExist = hand.filter((card) => card.displayVal === 'Ace');

	// For more than one Ace,
	if (aceExist.length > 0) {

		// Total is less than 21; Ace remains as 11
		if (total <= 21) {
			isSoft = true;
			return { total: total, isSoft: isSoft };
		}

		// Total is more than 21; Ace changes to 1
		// Only deduct 10 if card.val = 11, no need to deduct if card is already 1
		const findAce = hand.findIndex((card) => (card.displayVal === 'Ace' && card.val === 11));
		hand[findAce].val = 1;
		total -= 10;

		// Maybe should count a new total instead of hardcoding?

		// isSoft is True, if there is an additional ace with val of 11 present
		if (hand.find((card) => card.val === 11)) {
			isSoft = true;
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
	} else if (currentTotal = 17 && isSoft == true) {
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

	if (dealerScore < playerScore) {
		return `Player has ${playerScore} points. Dealer has ${dealerScore} points. Player wins`;
	} else if (dealerScore > playerScore) {
		return `Player has ${playerScore} points. Dealer has ${dealerScore} points. Dealer wins`;
	} else {
		return `Player has ${playerScore} points. Dealer has ${dealerScore} points. It's a tie`;
	}
};

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
	// document.body.write =  `Dealer showing ${dealerCard.displayVal} of value ${dealerCard.val}, your count is ${count}.`;
	return `Dealer showing ${dealerCard.displayVal} of value ${dealerCard.val}, your count is ${count}.  Draw card?`;
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
let showHand = (player) => {
	let displayHand = player.hand.map((card) => card.displayVal);
	// document.body.write = `${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`;
	console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}
//!need to fix this


/**
 * Runs Blackjack Game
 */
const startGame = function () {
	player.drawCard();
	dealer.drawCard();
	player.drawCard();
	dealer.drawCard();

	let playerScore = calcPoints(player.hand).total;
	showHand(player);

	// Added this for extra credit but to review
	if (playerScore === 21) {
		return 'Player wins!';
	}
	while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
		player.drawCard();
		playerScore = calcPoints(player.hand).total;
		showHand(player);
	}
	if (playerScore > 21) {
		return 'You went over 21 - you lose!';
	}
	console.log(`Player stands at ${playerScore}`);

	let dealerScore = calcPoints(dealer.hand).total;

	// Added this for extra credit but to review
	if (dealerScore === 21) {
		return 'Dealer wins!';
	}
	while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
		dealer.drawCard();
		dealerScore = calcPoints(dealer.hand).total;
		showHand(dealer);
	}
	if (dealerScore > 21) {
		return 'Dealer went over 21 - you win!';
	}
	console.log(`Dealer stands at ${dealerScore}`);

	return determineWinner(playerScore, dealerScore);
}
console.log(startGame());
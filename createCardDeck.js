/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
	const deck = []
	const suits = ['hearts', 'spades', 'clubs', 'diamonds']

	for (let index = 0; index < suits.length; index++) {
		// create an array of 13 objects
		for (let j = 1; j <= 13; j++) {
			// for each loop, push a card object to the deck

			// special cases for when j > 10
			let displayVal = ''

			if (j === 1) {
				displayVal = 'Ace'
			} else if (j === 11) {
				displayVal = 'Jack'
			} else if (j === 12) {
				displayVal = 'Queen'
			} else if (j === 13) {
				displayVal = 'King'
			} else {
				displayVal = j.toString()
			}


			const card = {
				val: j,
				displayVal: displayVal,
				suit: suits[index],
			}

			if (displayVal === 'Ace') {
				card.val = 11
			}

			if (displayVal === 'King' || displayVal === 'Jack' || displayVal === 'Queen') {
				card.val = 10
			}


			deck.push(card)
		}
	}
	return deck
}

// CHECKS
const deck = getDeck()
console.log(`Deck length equals 52? ${deck.length === 52}`)

const randomCard = deck[Math.floor(Math.random() * 52)]

const cardHasVal =
	randomCard && randomCard.val && typeof randomCard.val === 'number'
console.log(`Random card has val? ${cardHasVal}`)

const cardHasSuit =
	randomCard && randomCard.suit && typeof randomCard.suit === 'string'
console.log(`Random card has suit? ${cardHasSuit}`)

// Fixed error here
const cardHasDisplayVal =
	randomCard && randomCard.displayVal !== ''

console.log(`Random card has display value? ${cardHasDisplayVal}`)

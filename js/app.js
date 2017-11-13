/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function CardList() {
	this.deck = $('.deck');
	this.cards = $('.card');
}
CardList.prototype = {
	shuffle: function () {
		let randomIndex, tempCard;

		for (let i = 0; i < this.cards.length; i++) {
			randomIndex = Math.floor(Math.random() * i);
			tempCard = this.cards[i];
			this.cards[i] = this.cards[randomIndex];
			this.cards[randomIndex] = tempCard;
		}
		this.deck.empty();
		this.deck.append(this.cards);
	},
	open: function (i) {
		$(this.cards[i]).toggleClass('open');
	},
	show: function (i) {
		$(this.cards[i]).toggleClass('show');
	},
	displayCard: function (i) {
		for (let i = 0; i < this.cards.length; i++) {
			$(this.cards[i]).on('click', (e) => {
				e.preventDefault();
				this.open(i);
				this.show(i);
			});
		}
	}
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



var x = new CardList;
x.shuffle();
x.displayCard();
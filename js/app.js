function CardList() {
	this.deck = $('.deck');
	this.cards = $('.card');
	this.moves = 0;
	this.matched = 0;
	this.rate = 5;
	this.shuffle();
}
CardList.prototype = {
	restart: function () {
		this.shuffle();
		this.closeAll();
		this.moves = 0;
		$('.moves').text(0);

		//reset stars
		this.rate = 5;
		let star = $('.stars').find('.fa');
		star.addClass('fa-star');
		star.removeClass('fa-star-o');
	},
	shuffle: function () {
		let randomIndex, tempCard;

		//shuffle cards
		for (let i = 0; i < this.cards.length; i++) {
			randomIndex = Math.floor(Math.random() * i);
			tempCard = this.cards[i];
			this.cards[i] = this.cards[randomIndex];
			this.cards[randomIndex] = tempCard;
		}

		//empty the old deck and add the new cards
		this.deck.empty();
		this.deck.append(this.cards);
		//the event handling function
		this.play();
	},
	open: function (card) {
		$(card).addClass('open show');
		this.count();
	},
	isOpened(card) {
		return card.hasClass('open') ? true : false;
	},
	close: function (card) {
		$(card).removeClass('open show wrong');
	},
	closeAll: function () {
		this.cards.removeClass('open show match');
	},
	count: function () {
		$('.moves').text(++this.moves);

		//remove stars every 5 counts
		let star = $('.stars').find('.fa').last();
		if (this.moves > this.rate) {
			star.removeClass('fa-star');
			star.addClass('fa-star-o');
			this.rate += 5;
		}
	},
	isWon: function () {
		if (this.matched == 8) {
			this.deck.empty();
			this.deck.append().html(`<h1> Congratulations you've won in ${this.moves} moves </h1>`);
		}
	},
	dismatch: function (cardList) {
		cardList.addClass('wrong');
		setTimeout(this.close, 500, cardList);
	},
	match: function () {
		let openedCards = $('.open');
		if (openedCards.length == 2) {
			//check if both have the same hidden symbol
			if ($(openedCards[0]).children().attr('class') == $(openedCards[1]).children().attr('class')) {
				openedCards.addClass('match');
				//remove the matched cards from the openedCards list
				this.close(openedCards);
				this.matched++;
				//check if the user has won yet
				this.isWon();
			} else {
				this.dismatch(openedCards);
			}
		}
	},
	play: function () {
		for (let i = 0; i < this.cards.length; i++) {
			let card = $(this.cards[i]);
			card.on('click', (e) => {
				e.preventDefault();
				if (!this.isOpened(card)) {
					this.open(card);
					this.match();
				}
			});
		}
	}
};
var myDeck = new CardList;
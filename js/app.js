function CardList() {
	this.deck = $('.deck');
	this.cards = $('.card');
	this.moves = 0;
	this.matched = 0;
	this.rateFlag = 10;
	this.shuffle();
}
CardList.prototype = {
	restart: function () {
		this.shuffle();
		this.closeAll();
		this.moves = 0;
		$('.moves').text(0);

		//reset stars
		this.rateFlag = 10;
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
	},
	isOpened(card) {
		return card.hasClass('open') ? true : false;
	},
	isMatched(card) {
		return card.hasClass('match') ? true : false;
	},
	close: function (card) {
		$(card).removeClass('open show wrong');
	},
	closeAll: function () {
		this.cards.removeClass('open show match');
	},
	count: function () {
		$('.moves').text(++this.moves);
	},
	starRate: function () {
		//find the last filled star
		let star = $('.stars').find('.fa-star').last();
		//stop this function when all stars are empty
		if (!star.length)
			return;

		if (this.moves > this.rateFlag) {
			//replace the filled star with empty star
			star.removeClass('fa-star');
			star.addClass('fa-star-o');
			//to remove a star every 10 counts
			this.rateFlag += 10;
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
			this.count();
			this.starRate();
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
				if (!this.isMatched(card)) {
					this.open(card);
					this.match();
				}
			});
		}
	}
};
var myDeck = new CardList;
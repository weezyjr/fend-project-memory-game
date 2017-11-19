function CardList() {
	this.deck = $('.deck');
	this.cards = $('.card');
	this.moves = 0;
	this.matched = 0;
	this.rateFlag = 10;
	this.clock = {
		hr: 0,
		min: 0,
		sec: 0
	};
	this.shuffle();
	this.timeCounter();
}
CardList.prototype = {
	shuffle() {
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
	timeCounter() {
		this.timer = setInterval(() => {
			this.clock.sec++;
			if (this.clock.sec == 60) {
				this.clock.sec = 0;
				this.clock.min++;
			}
			if (this.clock.min == 60) {
				this.clock.sec = 0;
				this.clock.min = 0;
				this.clock.hr++;
			}
			$('#sec').text(this.clock.sec);
			$('#min').text(this.clock.min);
			$('#hr').text(this.clock.hr);

		}, 1000);
	},
	resetClock() {
		this.clock.sec = 0;
		this.clock.min = 0;
		this.clock.hr = 0;
	},
	resetMoves() {
		this.moves = 0;
		$('.moves').text(0);
	},
	restart() {
		this.closeAll();
		this.shuffle();
		clearInterval(this.timer);
		this.resetClock();
		this.timeCounter();
		this.resetMoves();

		//reset stars
		this.rateFlag = 10;
		let star = $('.stars').find('.fa');
		star.addClass('fa-star');
		star.removeClass('fa-star-o');
	},
	open(card) {
		$(card).addClass('open show');
	},
	close(card) {
		$(card).removeClass('open show wrong');
	},
	closeAll() {
		this.cards.removeClass('open show match');
	},
	isOpened(card) {
		return card.hasClass('open') ? true : false;
	},
	isMatched(card) {
		return card.hasClass('match') ? true : false;
	},
	count() {
		$('.moves').text(++this.moves);
	},
	starRate() {
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
	showModal() {
		let winModal = $('#winModal');
		let modalContent = winModal.find('.modal-content');
		let content = {
			stars: $('.stars'),
			timer: $('.timer'),
			congrats: '<h1> Congratulations </h1>',
			moves: `<p> you've won in ${this.moves} moves </p>`,
			playAgainBtn: '<button id="playAgain"> Play Again! </button>'
		};

		//show the win modal
		winModal.css('display', 'block');

		//add content to the modal
		modalContent.append(content.congrats);
		modalContent.append(content.moves);

		//clone the timer and the stars and append them to the modal
		content.timer.clone().appendTo(modalContent);
		content.stars.clone().appendTo(modalContent);

		//Play Again button 
		modalContent.append(content.playAgainBtn);
		modalContent.on('click', '#playAgain', () => {
			winModal.css('display', 'none');
			this.restart();
		});
	},
	isWon() {
		const winFlag = 8;
		if (this.matched == winFlag) {
			clearInterval(this.timer);
			this.showModal();
			return true;
		} else
			return false;
	},
	match() {
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
	dismatch(cardList) {
		//class with red bkgd
		cardList.addClass('wrong');
		//close the card after 0.5s
		setTimeout(this.close, 500, cardList);
	},
	play() {
		for (let i = 0; i < this.cards.length; i++) {
			let card = $(this.cards[i]);
			//event handler for opning cards
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
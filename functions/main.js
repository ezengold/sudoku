import DATABASE, { tokens } from "./data.js";
import { getTime, getRandom } from './utils.js';

const LEN = 9;
const cards = [];
let playingCards = [];
const startTime = new Date();
let currentTime = new Date();
let COUPS = 0;
let activeFocus = 0;

// FUNCTIONS
const setCardActive = () => {
	document.querySelectorAll('.game-card')[activeFocus].classList.add('active');
};

const removeActive = () => {
	document.querySelectorAll('.game-card')[activeFocus].classList.remove('active');
};

const getValue = keyCode => {
	return tokens.find(el => el[keyCode])[keyCode];
};

const addCoups = () => {
	COUPS++;
	document.getElementById('coups').innerText = COUPS;
};

const getRandomGame = () => {
	return DATABASE[getRandom(0, DATABASE.length - 1)];
};

const checkOnColums = () => {
	// CHECK ON COLUMN
	document.querySelectorAll('.game-card').forEach((card, key) => {
		if (!!card.innerText) {
			let done = false;
			document.querySelectorAll('.game-card').forEach((c, k) => {
				if (!!c.innerText) {
					if (key % LEN === k % LEN && key !== k && !done) {
						if (card.innerText === c.innerText && !done) {
							done = true;
							if (!card.classList.contains('unauthorized')) {
								card.classList.add('unauthorized');
							}
						} else {
							if (card.classList.contains('unauthorized')) {
								card.classList.remove('unauthorized');
							}
						}
					}
				}
			});
		} else {
			document.querySelectorAll('.game-card').forEach((c, k) => {
				if (key % LEN === k % LEN && key !== k) {
					if (card.classList.contains('unauthorized')) {
						card.classList.remove('unauthorized');
					}
				}
			});
		}
	});
};

const checkOnLines = () => {
	// CHECK ON COLUMN
	document.querySelectorAll('.game-card').forEach((card, key) => {
		if ((Math.floor(key / LEN) * (LEN - 1)) && key !== activeFocus) {
			if (card.innerText === playingCards[activeFocus].innerText) {
				if (!card.classList.contains('unauthorized')) {
					card.classList.add('unauthorized');
				}
			} else {
				if (card.classList.contains('unauthorized')) {
					card.classList.remove('unauthorized');
				}
			}
		}
	});
};

const checkMovement = () => {
	checkOnColums();
	// checkOnLines();
};
// END FUNCTIONS

const GAME = getRandomGame();

document.getElementById('coups').innerText = COUPS;
document.querySelectorAll('.game-card').forEach((card, key) => {
	card.innerText = GAME.game[key];
	if (GAME.game[key] != null) {
		card.classList.add('hovered');
	}
	cards.push(card);

	card.addEventListener('click', e => {
		removeActive();
		activeFocus = key;
		setCardActive();
	});
});

playingCards = cards;
playingCards[activeFocus].classList.add('active');

document.addEventListener('keyup', e => {
	// MOVE MANAGING
	if (e.keyCode === 37) {
		// LEFT
		removeActive();
		if (activeFocus === 0) {
			activeFocus = LEN * LEN - 1;
		} else {
			activeFocus--;
		}
		setCardActive();
	} if (e.keyCode === 38) {
		// UP
		removeActive();
		if ((activeFocus - LEN) < 0) {
			activeFocus = LEN * LEN + (activeFocus - LEN);
		} else {
			activeFocus -= LEN;
		}
		setCardActive();
	} else if (e.keyCode === 39) {
		// RIGHT
		removeActive();
		if (activeFocus === (LEN * LEN - 1)) {
			activeFocus = 0;
		} else {
			activeFocus++;
		}
		setCardActive();
	} else if (e.keyCode === 40) {
		// DOWN
		removeActive();
		if ((activeFocus + LEN) >= (LEN * LEN)) {
			activeFocus = activeFocus + LEN - LEN * LEN;
		} else {
			activeFocus += LEN;
		}
		setCardActive();
	// END MOVE MANAGING

	// NUMBER MANAGING 
	} else if ((e.keyCode >= 97 && e.keyCode <= 105) || e.keyCode >= 49 && e.keyCode <= 57) {
		if (GAME.game[activeFocus] === null) {
			if (getValue(e.keyCode) !== parseInt(playingCards[activeFocus].innerText)) {
				addCoups();
				playingCards[activeFocus].innerText = getValue(e.keyCode);
			}
		} else {
			playingCards[activeFocus].classList.add('unauthorized');
			setTimeout(() => {
				playingCards[activeFocus].classList.remove('unauthorized');
			}, 200);
		}
		checkMovement();
	} else if (e.keyCode === 8) {
		if (GAME.game[activeFocus] === null) {
			addCoups();
			playingCards[activeFocus].innerText = '';
		} else {
			cards[activeFocus].classList.add('unauthorized');
			setTimeout(() => {
				cards[activeFocus].classList.remove('unauthorized');
			}, 200);
		}
		checkMovement();
	}
});

setInterval(() => {
	document.getElementById('time').innerText = getTime(startTime, new Date());
	currentTime = new Date();
}, 500);
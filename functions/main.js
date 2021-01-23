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

const checkMovement = () => {
	// document.querySelectorAll('.game-card').forEach((card, key) => {
		// CHECK ON COLUMN
		// console.log(activeFocus%(LEN-1));
		// if ((key )%(LEN-1) === activeFocus%(LEN-1)) {
		// 	card.classList.add('unauthorized');
		// }
	// });
}
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

cards[activeFocus].classList.add('active');
playingCards = cards;

document.addEventListener('keyup', e => {
	let card;
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
		card = cards[activeFocus];
		if (GAME.game[activeFocus] === null) {
			if (getValue(e.keyCode) !== parseInt(card.innerText)) {
				addCoups();
				card.innerText = getValue(e.keyCode);
				playingCards[activeFocus] = getValue(parseInt(e.keyCode));
			}
		} else {
			card.classList.add('unauthorized');
			setTimeout(() => {
				card.classList.remove('unauthorized');
			}, 200);
		}
		// checkMovement();
	} else if (e.keyCode === 8) {
		card = cards[activeFocus];
		if (GAME.game[activeFocus] === null) {
			addCoups();
			card.innerText = '';
			playingCards[activeFocus] = null;
		} else {
			card.classList.add('unauthorized');
			setTimeout(() => {
				card.classList.remove('unauthorized');
			}, 200);
		}
	} else {
		card = cards[activeFocus];
		card.classList.add('unauthorized');
		setTimeout(() => {
			card.classList.remove('unauthorized');
		}, 200);
	}
});

setInterval(() => {
	document.getElementById('time').innerText = getTime(startTime, new Date());
	currentTime = new Date();
}, 500);
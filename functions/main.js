import DATABASE, { tokens, zones } from "./data.js";
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

const isAllCardsFilled = () => {
	for (let i = 0; i < document.querySelectorAll('.game-card').length; i++) {
		const card = document.querySelectorAll('.game-card')[i];
		if (!!!card.innerText)
			return false;
	}
	return true;
};

const checkOnColums = () => {
	// CHECK ON COLUMN
	let wrongs = [];
	document.querySelectorAll('.game-card').forEach((card, key) => {
		if (!!card.innerText) {
			let done = false;
			document.querySelectorAll('.game-card').forEach((c, k) => {
				if (!!c.innerText) {
					if (key % LEN === k % LEN && key !== k && !done && playingCards[k] !== null) {
						if (card.innerText === c.innerText && !done) {
							done = true;
							wrongs.push(key);
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

	return wrongs;
};

const checkOnLines = () => {
	// CHECK ON LINES
	let wrongs = [];
	document.querySelectorAll('.game-card').forEach((card, key) => {
		if (!!card.innerText) {
			let done = false;
			const line = Math.floor(key / LEN);
			document.querySelectorAll('.game-card').forEach((c, k) => {
				if (!!c.innerText) {
					if (k >= (line * LEN) && k <= (line * LEN + (LEN - 1)) && key !== k && !done) {
						if (card.innerText === c.innerText && !done && playingCards[k] !== null) {
							done = true;
							wrongs.push(key);
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

	return wrongs;
};

const checkInRange = () => {
	// CHECK IN RANGE
	let wrongs = [];
	document.querySelectorAll('.game-card').forEach((card, key) => {
		if (!!card.innerText) {
			let fellowsIndex = zones.find(range => range.findIndex(el => el === key) !== -1);
			// console.log('key = ', key, 'fellows = ', fellowsIndex);
			playingCards.forEach((c, k) => {
				if (!!c.innerText && fellowsIndex.findIndex(fellow => fellow === k) !== -1 && card.innerText === c.innerText && key !== k) {
					// console.log('card[', key, '] = ', card.innerText, ', c[', k, '] = ', c.innerText, ',', card.innerText === c.innerText);
					wrongs.push(key);
				}
			});
		}
	});

	return wrongs;
};

const shrinkArray = (array) => {
	let out = [];
	for (let i = 0; i < array.length; i++) {
		const el = array[i];
		
		if (out.findIndex(e => e === el) === -1) {
			out = out.concat(el);
		}
	}
	return out;
}

const checkMovement = () => {
	let wrongsOnColums = checkOnColums();
	let wrongOnLines = checkOnLines();
	let wrongInRange = checkInRange();

	let wrongsTiles = shrinkArray([...wrongsOnColums, ...wrongOnLines, ...wrongInRange]);

	wrongsTiles.forEach(tile => {
		if (!playingCards[tile].classList.contains('unauthorized')) {
			playingCards[tile].classList.add('unauthorized');
		}
	});

	if (wrongsTiles.length === 0) {
		if (isAllCardsFilled()) {
			//TRIGGER END OF GAME
		}
	}
};
// END FUNCTIONS

const GAME = getRandomGame();

document.getElementById('coups').innerText = COUPS;
document.querySelectorAll('.game-card').forEach((card, key) => {
	card.innerText = GAME.game[key];
	if (GAME.game[key] != null) {
		card.classList.add('hovered');
	} else {
		card.classList.add('text-yellow');
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
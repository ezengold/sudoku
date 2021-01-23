// FUNCTIONS
const setCardActive = () => {
	cards[activeFocus].classList.add('active');
}

const removeActive = () => {
	cards[activeFocus].classList.remove('active');
}

const getValue = keyCode => {
	return tokens.find(el => el[keyCode])[keyCode];
}

const addCoups = () => {
	COUPS++;
	document.getElementById('coups').innerText = COUPS;
}

const getTime = (date1, date2) => {
	let distance = Math.abs(date1 - date2);
	const hours = Math.floor(distance / 3600000);
	distance -= hours * 3600000;
	const minutes = Math.floor(distance / 60000);
	distance -= minutes * 60000;
	const seconds = Math.floor(distance / 1000);
	return `${hours}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
}

const shuffle = (array) => {
	let currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

const getRandomGame = () => {
	let answer = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	let game = [];
	let showedIndexes = (shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8])).slice(0, 4);

	for (let i = 0; i < answer.length; i++) {
		const ans = answer[i];

		if (showedIndexes.includes(ans)) {
			game[i] = ans;
		} else {
			game[i] = null;
		}
	}

	return  {
		game,
		answer
	};
}
// END FUNCTIONS


const GAME = getRandomGame();
const LEN = 3;
const cards = [];
const startTime = new Date();
let currentTime = new Date();
let COUPS = 0;
let activeFocus = 0;

const tokens = [
	{ 49: 1 }, { 97: 1 },
	{ 50: 2 }, { 98: 2 },
	{ 51: 3 }, { 99: 3 },
	{ 52: 4 }, { 100: 4 },
	{ 53: 5 }, { 101: 5 },
	{ 54: 6 }, { 102: 6 },
	{ 55: 7 }, { 103: 7 },
	{ 56: 8 }, { 104: 8 },
	{ 57: 9 }, { 105: 9 },
];

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
		card = cards[activeFocus];
		if (getValue(e.keyCode) !== parseInt(card.innerText)) {
			addCoups();
			card.innerText = getValue(e.keyCode);
		}
	} else if (e.keyCode === 8) {
		card = cards[activeFocus];
		addCoups();
		card.innerText = '';
	}
});

setInterval(() => {
	document.getElementById('time').innerText = getTime(startTime, new Date());
	currentTime = new Date();
}, 500);
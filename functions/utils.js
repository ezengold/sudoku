export const getTime = (date1, date2) => {
	let distance = Math.abs(date1 - date2);
	const hours = Math.floor(distance / 3600000);
	distance -= hours * 3600000;
	const minutes = Math.floor(distance / 60000);
	distance -= minutes * 60000;
	const seconds = Math.floor(distance / 1000);
	return `${hours}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
};

export const shuffle = (array) => {
	let currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};

export const getRandom = (min, max) => {
	return Math.floor(Math.random()*(max - min) + min);
};
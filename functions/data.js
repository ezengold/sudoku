export default [
	{
		game: [
			2, null, null, 6, 3, 4, null, null, 7,
			null, null, null, null, null, 1, 9, null, null,
			null, 7, 6, 8, null, null, 3, null, null,
			4, 8, null, 1, null, 6, 2, null, 5,
			7, null, null, null, null, null, null, null, 6,
			6, null, 2, 7, null, 5, null, 3, 8,
			null, null, 1, null, null, 3, 7, 8, null,
			null, null, 4, 9, null, null, null, null, null,
			9, null, null, 2, 5, 8, null, null, 1
		],
		answer: []
	},
	{
		game: [
			1, null, null, null, null, null, null, null, 6,
			null, null, 6, null, 2, null, 7, null, null,
			7, 8, 9, 4, 5, null, 1, null, 3,
			null, null, null, 8, null, 7, null, null, 4,
			null, null, null, null, 3, null, null, null, null,
			null, 9, null, null, null, 4, 2, null, 1,
			3, 1, 2, 9, 7, null, null, 4, null,
			null, 4, null, null, 1, 2, null, 7, 8,
			9, null, 8, null, null, null, null, null, null
		],
		answer: []
	},
	{
		game: [
			5, 3, null, null, 7, null, null, null, null,
			6, null, null, 1, 9, 5, null, null, null,
			null, 9, 8, null, null, null, null, 6, null,
			8, null, null, null, 6, null, null, null, 3,
			4, null, null, 8, null, 3, null, null, 1,
			7, null, null, null, 2, null, null, null, 6,
			null, 6, null, null, null, null, 2, 8, null,
			null, null, null, 4, 1, 9, null, null, 5,
			null, null, null, null, 8, null, null, 7, 9
		],
		answer: []
	},
	{
		game: [
			6, 1, null, null, 4, null, 7, null, null,
			null, null, null, null, 5, null, 9, null, null,
			2, null, null, null, null, 6, 5, null, 8,
			4, null, null, 9, null, null, null, 6, null,
			null, null, null, null, null, null, null, null, null,
			null, 7, null, null, null, 5, null, null, 3,
			1, null, 8, 7, null, null, null, null, 9,
			null, null, 6, null, 2, null, null, null, null,
			null, null, 3, null, 9, null, null, 8, 1
		],
		answer: [
			6, 1, 5, 8, 4, 9, 7, 3, 2,
			3, 8, 7, 2, 5, 1, 9, 4, 6,
			2, 9, 4, 3, 7, 6, 5, 1, 8,
			4, 3, 2, 9, 8, 7, 1, 6, 5,
			5, 6, 1, 4, 3, 2, 8, 9, 7,
			8, 7, 9, 6, 1, 5, 4, 2, 3,
			1, 4, 8, 7, 6, 3, 2, 5, 9,
			9, 5, 6, 1, 2, 8, 3, 7, 4,
			7, 2, 3, 5, 9, 4, 6, 8, 1
		]
	}
];

export const tokens = [
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

export const zones = [
	[0, 1, 2, 9, 10, 11, 18, 19, 20], [3, 4, 5, 12, 13, 14, 21, 22, 23], [6, 7, 8, 15, 16, 17, 24, 25, 26],
	[27, 28, 29, 36, 37, 38, 45, 46, 47], [30, 31, 32, 39, 40, 41, 48, 49, 50], [33, 34, 35, 42, 43, 44, 51, 52, 53],
	[54, 55, 56, 63, 64, 65, 72, 73, 74], [57, 58, 59, 66, 67, 68, 75, 76, 77], [60, 61, 62, 69, 70, 71, 78, 79, 80],
];
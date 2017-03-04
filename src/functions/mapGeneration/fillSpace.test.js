import fillSpace from './fillSpace.js';

const before1 = [
	["wall", "wall", "wall"],
	["wall", "wall", "wall"],
	["wall", "wall", "wall"],
];
const after1 = [
	["wall", "wall", "wall"],
	["wall", "floor", "floor"],
	["wall", "floor", "floor"],
];

const arrayCoords = {
	startRow: 1,
	startCol: 1,
	endRow: 2,
	endCol: 2,
};

it('expects to transform before1 into after1', () => {
	expect(
		fillSpace(arrayCoords, before1, "floor")
	).toEqual(after1)
})

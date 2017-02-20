import fillSpecificPartOf2dArray from './fillSpecificPartOf2dArray.js';

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

it('expects to transform before1 into after1', () => {
	expect(
		fillSpecificPartOf2dArray(1,1,2,2, before1, "floor")
	).toEqual(after1)
})

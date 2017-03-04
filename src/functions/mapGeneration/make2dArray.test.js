import make2dArray from './make2dArray.js';

const threeByThreeArrayWithWall = [
	["wall", "wall", "wall"],
	["wall", "wall", "wall"],
	["wall", "wall", "wall"],
]

it('expects a 2d array of 3x3 of "wall"', () => {
	expect(make2dArray(3,3,"wall")).toEqual(threeByThreeArrayWithWall)
});

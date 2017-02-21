import getSpaceAroundAnArray from './getSpaceAroundAnArray.js';
const X = 1;

const case1 = [
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,X,X,0,0],
	[0,0,0,0,X,X,0,0],
	[0,0,0,0,X,X,0,0],
	[0,0,0,0,X,X,0,0],
];
const case2 = [
	[0,0,0,0,0,X,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,X,X,0,0],
	[0,0,0,0,X,X,0,0],
	[0,X,0,0,X,X,0,0],
	[0,0,0,0,X,X,0,X],
];
const case3 = [
	[0,0,0,0,0,0,0,0],
	[0,X,0,X,X,X,0,0],
	[X,0,0,X,X,X,0,X],
	[0,0,0,X,X,X,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
];

const case4 = [
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,X,X,0,0,0,0,0],
	[0,X,X,0,0,0,X,0],
	[0,X,X,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[X,0,0,0,X,0,0,0],
	[0,0,X,0,0,0,0,0],
];//array startRow: 2, startCol: 1, endRow: 4, endCol: 2
	// obstacles at 3,6
  //              6,4
  //              6,0
  //              7,2
it('expects case4 right to return startRow: 0, startCol: 3, endRow: 5, endCol: 6', () => {
	expect(
		getSpaceAroundAnArray(2,1,4,2, case4, 0).right
	).toEqual([0,3,5,6])
});
it('expects case4 bottom to return startRow: 5, startCol: 1, endrow: 6, endCol: 3', () => {
	expect(
		getSpaceAroundAnArray(2,1,4,2, case4, 0).bottom
	).toEqual([5,1,6,3])
});


//Right case 1

//getSpaceAroundAnArray(4,4,7,5, case2, 0).right.forEach( (el, index) => 
//	console.log("row:", index, "number of cols free from 0 col:", el)	
//)

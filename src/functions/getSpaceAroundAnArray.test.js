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
	[0,X,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,X,X,0,0],
	[0,0,0,0,X,X,0,0],
	[0,X,0,0,X,X,0,0],
	[0,0,0,0,X,X,0,X],
];//array startRow: 4, startCol: 4, endRow: 7, endCol: 5
  // obstacles at 0,5
  //              2,1
  //              6,1
  //              7,7
it('expect return.top equal startRow: 1, startCol: 2, endRow: 3, endCol: 7', () => {
	expect(
		getSpaceAroundAnArray(4,3,7,5, case2, 0).top
	).toEqual([1,2,3,7])
});

const case3 = [
	[0,X,0,0,0,0,0,0],
	[0,0,0,X,X,X,0,0],
	[X,0,0,X,X,X,0,X],
	[0,0,0,X,X,X,0,0],
	[X,0,0,0,0,0,0,0],
	[0,X,0,0,0,0,0,X],
	[0,0,0,X,0,0,0,0],
	[0,0,0,0,X,X,0,0],
];
//array startRow: 1, startCol: 3, endRow: 3, endCol: 5
// obstacles at 0,1
// 							2,0
// 							2,7
//							4,0
//							5,1
//							5,7
//							6,3
//							7,4
//							7,5
it('expect return.left of case3 to equal startRow: 1, startCol: 1, endRow: 4, endCol: 2', () => {
	expect (
		getSpaceAroundAnArray(1,3,3,5, case3, 0).left
	).toEqual([1,1,4,2])
});
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
it('expects case4 right to return startRow: 0, startCol: 3, endRow: 5, endCol: 5', () => {
	expect(
		getSpaceAroundAnArray(2,1,4,2, case4, 0).right
	).toEqual([0,3,5,5])
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

import getSpaceAroundAnArray from './getSpaceAroundAnArray.js';

const case1 = [
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,1,1,0,0],
	[0,0,0,0,1,1,0,0],
	[0,0,0,0,1,1,0,0],
	[0,0,0,0,1,1,0,0],
];
const case2 = [
	[0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,1,1,0,0],
	[0,0,0,0,1,1,0,0],
	[0,1,0,0,1,1,0,0],
	[0,0,0,0,1,1,0,1],
];
const case3 = [
	[0,0,0,0,0,0,0,0],
	[0,2,0,1,1,1,0,0],
	[2,0,0,1,1,1,0,2],
	[0,0,0,1,1,1,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
];



//Left case 1
//it('expects case 1 return.left[4] to return 4', () => {
//	expect(getSpaceAroundAnArray(4,4,7,5, case1, 0).left[4]).toEqual(4)	
//}); 
//it('expects case 1 return.left[5] to return 4', () => {
//	expect(getSpaceAroundAnArray(4,4,7,5, case1, 0).left[5]).toEqual(4)	
//});
//it('expects case 1 return.left[6] to return 4', () => {
//	expect(getSpaceAroundAnArray(4,4,7,5, case1, 0).left[6]).toEqual(4)	
//});
//it('expects case 1 return.left[7] to return 4', () => {
//	expect(getSpaceAroundAnArray(4,4,7,5, case1, 0).left[7]).toEqual(4)	
//});

//Left case 2
//console.log(getSpaceAroundAnArray(4,4,7,5, case2, 0));
//it('expects case 2 return.left[7] to return 4', () => {
//	expect(getSpaceAroundAnArray(4,4,7,5, case2, 0).left[7]).toEqual(4)	
//});
//it('expects case 2 return.left[6] to return 2', () => {
//	expect(getSpaceAroundAnArray(4,4,7,5, case2, 0).left[6]).toEqual(2)	
//});

//Right case 1

getSpaceAroundAnArray(4,4,7,5, case2, 0).right.forEach( (el, index) => 
	console.log("row:", index, "number of cols free from 0 col:", el)	
)
//it('expects case1 return.right[4] to return 2', () => {
//	expect(getSpaceAroundAnArray(4,4,7,5, case1, 0).right[4]).toEqual(2)
//});
//it('expects case2 return.right[7] to return 2', () => {
//	expect(getSpaceAroundAnArray(4,4,7,5, case2, 0).right[7]).toEqual(1)
//});

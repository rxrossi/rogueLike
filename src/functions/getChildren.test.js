import getChildren from './getChildren.js'

describe("Given return of getSpaceAround, coordsOfMother, min width and min height of children, Returns array with objects to create children: [ {startRow, startCol, endRow, endCol, door:[row,col]}, anotherChildrenLikePrevious ]", () => {

  const room = {
		startRow: 10,
		startCol: 26,
		endRow: 16,
		endCol: 36,
	} // this means a 6 row per 10 col	

	const spaceAround = {
		left: {
			startRow: 2,
			startCol: 1,
			endRow: 20,
			endCol: 25	
		},//18 rows 24 cols
		right: {
			startRow: 5,
			startCol: 37,
			endRow: 40,
			endCol: 57	
		},// 35 rows, 20 cols
		top: {
			startRow: 0,
		  startCol: 17,
			endRow: 9,
			endCol: 40	
		}, // 9 rows, 23 cols
		bottom: {
			startRow: 17,
			startCol: 2,
			endRow: 42,
			endCol: 36
		}//25 rows, 34 cols
	}
	const minW = 5; const maxW = 10; const minH = 5; const maxH = 10;
	const params = [
		spaceAround, room, { minW, maxW, minH, maxH }
	]
	const answer = getChildren(...params)
	console.log(answer)
  const { left, right, top, bottom } = answer;

	//TODO: need to make a test case where the maxW and maxH can lead to a point outside the space available
	// 			-- it is probably better to make a forEach params with the tests
	//TODO: I also had the idea that could be better to test min and max values instead of actual values, but some values like actual width and height would still need to be tested as they are and on a later refactor it could lead to problems like the actual value no being in range of maxs and mins if I don't writte more tests before to make sure of this
	
	// check if min and max height and width are being respected
		//left
		left.width = left.endCol - left.startCol
		left.height = left.endRow - left.startRow
		it('check width and height of left', ()=> {
			expect(left.width).toBeGreaterThanOrEqual(minW);
			expect(left.height).toBeGreaterThanOrEqual(minH);
			expect(left.width).toBeLessThanOrEqual(maxW);
			expect(left.height).toBeLessThanOrEqual(maxH);
		});	
		//right
		right.width = right.endCol - right.startCol
		right.height = right.endRow - right.startRow
		it('check width and height of right', ()=> {
			expect(right.width).toBeGreaterThanOrEqual(minW);
			expect(right.height).toBeGreaterThanOrEqual(minH);
			expect(right.width).toBeLessThanOrEqual(maxW);
			expect(right.height).toBeLessThanOrEqual(maxH);
		});
		//top
		top.width = top.endCol - top.startCol
		top.height = top.endRow - top.startRow
		it('check width and height of top', ()=> {
			expect(top.width).toBeGreaterThanOrEqual(minW);
			expect(top.height).toBeGreaterThanOrEqual(minH);
			expect(top.width).toBeLessThanOrEqual(maxW);
			expect(top.height).toBeLessThanOrEqual(maxH);
		});
		//bottom
		bottom.width = bottom.endCol - bottom.startCol
		bottom.height = bottom.endRow - bottom.startRow
		it('check width and height of bottom', ()=> {
			expect(bottom.width).toBeGreaterThanOrEqual(minW);
			expect(bottom.height).toBeGreaterThanOrEqual(minH);
			expect(bottom.width).toBeLessThanOrEqual(maxW);
			expect(bottom.height).toBeLessThanOrEqual(maxH);
		});	

	// check if non fixed cols and rows are inside of spaceAround
		it('checks for left side to see if everything is inside space really available', ()=> {
			expect(left.startRow).toBeGreaterThanOrEqual(spaceAround.left.startRow);
			expect(left.startCol).toBeGreaterThanOrEqual(spaceAround.left.startCol);
			expect(left.endRow).toBeLessThanOrEqual(spaceAround.left.endRow);
			expect(left.endCol).toBeLessThanOrEqual(spaceAround.left.endCol);
		});
		it('checks for right side to see if everything is inside space really available', ()=> {
			expect(right.startRow).toBeGreaterThanOrEqual(spaceAround.right.startRow);
			expect(right.startCol).toBeGreaterThanOrEqual(spaceAround.right.startCol);
			expect(right.endRow).toBeLessThanOrEqual(spaceAround.right.endRow);
			expect(right.endCol).toBeLessThanOrEqual(spaceAround.right.endCol);
		});
		it('checks for top side to see if everything is inside space really available', ()=> {
			expect(top.startRow).toBeGreaterThanOrEqual(spaceAround.top.startRow);
			expect(top.startCol).toBeGreaterThanOrEqual(spaceAround.top.startCol);
			expect(top.endRow).toBeLessThanOrEqual(spaceAround.top.endRow);
			expect(top.endCol).toBeLessThanOrEqual(spaceAround.top.endCol);
		});
		it('checks for bottom side to see if everything is inside space really available', ()=> {
			expect(bottom.startRow).toBeGreaterThanOrEqual(spaceAround.bottom.startRow);
			expect(bottom.startCol).toBeGreaterThanOrEqual(spaceAround.bottom.startCol);
			expect(bottom.endRow).toBeLessThanOrEqual(spaceAround.bottom.endRow);
			expect(bottom.endCol).toBeLessThanOrEqual(spaceAround.bottom.endCol);
		});

	// check if left and right startRows are less than room.endRow
	it('check if left and right startRows are less than room.endRow', ()=> {
		expect(left.startRow).toBeLessThan(room.endRow);
		expect(right.startRow).toBeLessThan(room.endRow);
	});
	// check if left and right endRows are greater than room.startRow
	it('check if left and right endRows are greater than room.StartRow', ()=> {
		expect(left.endRow).toBeGreaterThan(room.startRow);
		expect(right.endRow).toBeGreaterThan(room.startRow);
	});
	// check if top and bottom startCol are less than room.endCol
	it('check if top and bottom startCol are less than room.endCol', ()=> {
		expect(top.startCol).toBeLessThan(room.endCol);	
		expect(bottom.startCol).toBeLessThan(room.endCol);	
	});
	// check if top and bottom endCol are greater than room.startCol
	it('check if top and bottom endCol are greater than room.startCol', ()=> {
		expect(top.endCol).toBeGreaterThan(room.startCol);
		expect(bottom.endCol).toBeGreaterThan(room.startCol);
	});

	// check for fixed cols and rows
	  it('checks if left endCol === spaceAround.left.endCol-1', ()=> {
		  expect(left.endCol).toEqual(spaceAround.left.endCol-1);	
	  });
	  it('check if right startCol === spaceAround.right.startCol+1', ()=> {
		  expect(right.startCol).toEqual(spaceAround.right.startCol+1);	
	  });
	  it('check if top endRow === spaceAround.top.endRow-1', ()=> {
		  expect(top.endRow).toEqual(spaceAround.top.endRow-1);
	  });
	  it('check if the bottom startRow === spaceAround.bottom.endRow+1', ()=> {
		  expect(bottom.startRow).toEqual(spaceAround.bottom.startRow+1)	
	  });
});

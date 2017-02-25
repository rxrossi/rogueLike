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
		},
		right: {
			startRow: 5,
			startCol: 37,
			endRow: 40,
			endCol: 47	
		},
		top: {
			startRow: 0,
		  startCol: 17,
			endRow: 9,
			endCol: 40	
		}
	}
	const minW = 5; const maxW = 10; const minH = 5; const maxH = 10;
	const params = [
		spaceAround, room, { minW, maxW, minH, maxH }
	]
	const answer = getChildren(...params)
	console.log(answer.right)

	//left coords tests
		const { left } = answer
		// horizontal tests
		it('expect endCol to be room.startCol-1', ()=> {
			expect(left.endCol).toEqual(room.startCol -1);	
		});
		it('expect that width is not less or more than minW and maxW', ()=> {
			let width = left.endCol - left.startCol;
			expect(width).toBeLessThanOrEqual(maxW);
			expect(width).toBeGreaterThanOrEqual(minW);
		});
		// vertical tests
		it('expect left.startRow less than room.endRow', ()=> {
			expect(left.startRow).toBeLessThan(room.endRow);
		});
		it('expect left.startRow >= spaceAround.left.startRow', ()=> {
			expect(left.startRow).toBeGreaterThanOrEqual(spaceAround.left.startRow);		
		});
		it('expects left.endRow <= spaceAround.left.endRow', ()=> {
			expect(left.endRow).toBeLessThanOrEqual(spaceAround.left.endRow)
		});
		it('expect left.endRow > room.startRow', ()=> {
			expect(left.endRow).toBeGreaterThan(room.startRow)
		});
		it('expects height >= minH, height <= maxW', ()=> {
			let height = left.endRow - left.startRow;
			expect(height).toBeGreaterThanOrEqual(minH);
			expect(height).toBeLessThanOrEqual(maxH);
		});

	//right coords tests
		const { right } = answer;
		// horizontal tests
		it('expect startCol to be room.endCol+1', ()=> {
			expect(right.startCol).toEqual(room.endCol +1);	
		});
		it('expect that width is not less or more than minW and maxW', ()=> {
			let width = right.endCol - right.startCol;
			expect(width).toBeLessThanOrEqual(maxW);
			expect(width).toBeGreaterThanOrEqual(minW);
		});
		// vertical tests
		it('expect left.startRow less than room.endRow', ()=> {
			expect(right.startRow).toBeLessThan(room.endRow);
		});
		it('expect left.startRow >= spaceAround.left.startRow', ()=> {
			expect(right.startRow).toBeGreaterThanOrEqual(spaceAround.right.startRow);		
		});
		it('expects left.endRow <= spaceAround.left.endRow', ()=> {
			expect(right.endRow).toBeLessThanOrEqual(spaceAround.right.endRow)
		});
		it('expect left.endRow > room.startRow', ()=> {
			expect(right.endRow).toBeGreaterThan(room.startRow)
		});
		it('expects height >= minH, height <= maxW', ()=> {
			let height = right.endRow - right.startRow;
			expect(height).toBeGreaterThanOrEqual(minH);
			expect(height).toBeLessThanOrEqual(maxH);
		});

});

const getChildren = (
	  spaceAround, room, {minW, maxW, minH, maxH} 
) => {
	const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min +1)) + min;
  
	let fnReturn = {};

	const leftEnoughW =  (spaceAround.left.endCol - spaceAround.left.startCol) >= minW; 
	const leftEnoughH = (spaceAround.left.endRow - spaceAround.left.startRow) >= minH; 

	const rightEnoughW =  (spaceAround.right.endCol - spaceAround.right.startCol) >= minW; 
	const rightEnoughH = (spaceAround.right.endRow - spaceAround.right.startRow) >= minH; 

	const topEnoughW =  (spaceAround.top.endCol - spaceAround.top.startCol) >= minW; 
	const topEnoughH = (spaceAround.top.endRow - spaceAround.top.startRow) >= minH; 

	const bottomEnoughW =  (spaceAround.bottom.endCol - spaceAround.bottom.startCol) >= minW; 
	const bottomEnoughH = (spaceAround.bottom.endRow - spaceAround.bottom.startRow) >= minH; 

	//left
	let left = {};
	if (leftEnoughH && leftEnoughW) {
		left.endCol = spaceAround.left.endCol- 1;

		left.minStartCol = (left.endCol - maxW) > spaceAround.left.startCol ? (left.endCol - maxW) : spaceAround.left.startCol;
		left.maxStartCol = left.endCol - minW;
		left.startCol = getRandomInt(left.minStartCol, left.maxStartCol);	

		left.minStartRow = (spaceAround.left.startRow) > (room.startRow +1 - maxH) ? (spaceAround.left.startRow) : (room.startRow +1 - maxW); 
		left.maxStartRow = (room.endRow -1) < (spaceAround.left.endRow - minH) ? (room.endRow -1) : (spaceAround.left.endRow - minH);
		left.startRow = getRandomInt(left.minStartRow, left.maxStartRow);

		left.minEndRow = (left.startRow + minH) > (room.startRow +1) ? (left.startRow + minH) : (room.startRow +1) ; 
		left.maxEndRow = spaceAround.left.endRow < (left.startRow + maxH) ? spaceAround.left.endRow : (left.startRow + maxH); 
		left.endRow = getRandomInt(left.minEndRow, left.maxEndRow);

		fnReturn.left = left;
	}	

	//right
	let right = {};
	if (rightEnoughH && rightEnoughW) {
		right.startCol = spaceAround.right.startCol+1;
		
		right.minEndCol = right.startCol + minW;
		right.maxEndCol = (right.startCol + maxW) < spaceAround.right.endCol ? (right.startCol + maxW) : spaceAround.right.endCol;
		right.endCol = getRandomInt(right.minEndCol, right.maxEndCol)

		right.minStartRow = (spaceAround.right.startRow) > (room.startRow +1 - maxH) ? (spaceAround.right.startRow) : (room.startRow +1 - maxH); 
		right.maxStartRow = (room.endRow -1) < (spaceAround.right.endRow - minH) ? (room.endRow -1) : (spaceAround.right.endRow - minH);
		right.startRow = getRandomInt(right.minStartRow, right.maxStartRow);

		right.minEndRow = (right.startRow + minH) > (room.startRow +1) ? (right.startRow + minH) : (room.startRow +1) ; 
		right.maxEndRow = spaceAround.right.endRow < (right.startRow + maxH) ? spaceAround.right.endRow : (right.startRow + maxH); 
		right.endRow = getRandomInt(right.minEndRow, right.maxEndRow);

		fnReturn.right = right;
	}
	
	//top
	let top = {};
	if (topEnoughH && topEnoughW) {
		top.endRow = spaceAround.top.endRow-1;

		top.minStartRow = (top.endRow - maxH) > spaceAround.top.startRow ? (top.endRow - maxH) : spaceAround.top.startRow; 
		top.maxStartRow = top.endRow - minH;
		top.startRow = getRandomInt(top.minStartRow, top.maxStartRow);
	
		top.minStartCol = (spaceAround.top.startCol) > (room.startCol +1 - minW) ? (spaceAround.top.startCol) : (room.startCol +1 -minW);
		top.maxStartCol = (room.endCol -1) < (spaceAround.top.endCol - minW) ? (room.endCol -1) : (spaceAround.top.endCol - minW); 
		top.startCol = getRandomInt(top.minStartCol, top.maxStartCol)

		top.minEndCol =  top.startCol + minW; 
		top.maxEndCol =  spaceAround.top.endCol < (top.startCol + maxW) ? spaceAround.top.endCol : (top.startCol + maxW);
		top.endCol = getRandomInt(top.minEndCol, top.maxEndCol)

		fnReturn.top = top;
	}

	//bottom
	let bottom = {};
	if (bottomEnoughH && bottomEnoughW) {
		bottom.startRow = spaceAround.bottom.startRow+1;

		bottom.minEndRow = bottom.startRow + minH;
		bottom.maxEndRow = (bottom.startRow + maxH) < spaceAround.bottom.endRow ? (bottom.startRow + maxH) : spaceAround.bottom.endRow;
		bottom.endRow = getRandomInt(bottom.minEndRow, bottom.maxEndRow)

		bottom.minStartCol = (spaceAround.bottom.startCol) > (room.startCol +1 - minW) ? (spaceAround.bottom.startCol) : (room.startCol +1 -minW);
		bottom.maxStartCol = (room.endCol -1) < (spaceAround.bottom.endCol - minW) ? (room.endCol -1) : (spaceAround.bottom.endCol - minW); 
		bottom.startCol = getRandomInt(bottom.minStartCol, bottom.maxStartCol)

		bottom.minEndCol =  bottom.startCol + minW; 
		bottom.maxEndCol =  spaceAround.bottom.endCol  < (bottom.startCol + maxW) ? spaceAround.bottom.endCol : (bottom.startCol + maxW);
		bottom.endCol = getRandomInt(bottom.minEndCol, bottom.maxEndCol)

		fnReturn.bottom = bottom;
  }

	// need to create doors
	// for left and right, col is fixed, simple
	// for left and right min and max row: (left as example)
	// 		min = room.startRow or left.startRow, whatever is greater
	// 		max = room.endRow or left.endRow, whatever is less

	if(leftEnoughH && leftEnoughW) {
		let minRow = Math.max(room.startRow, fnReturn.left.startRow);
		let maxRow = Math.min(room.endRow, fnReturn.left.endRow)

		fnReturn.left.door = {}
		fnReturn.left.door.row = getRandomInt(minRow, maxRow)
		fnReturn.left.door.col = room.startCol -1;		
	}

	if(rightEnoughH && rightEnoughW) {
		let minRow = Math.max(room.startRow, fnReturn.right.startRow);
		let maxRow = Math.min(room.endRow, fnReturn.right.endRow)

		fnReturn.right.door = {}
		fnReturn.right.door.row = getRandomInt(minRow, maxRow)
		fnReturn.right.door.col = room.endCol +1;		
	}

	if(topEnoughH && topEnoughW) {
		let minCol = Math.max(room.startCol, fnReturn.top.startCol);
		let maxCol = Math.min(room.endCol, fnReturn.top.endCol)

		fnReturn.top.door = {}
		fnReturn.top.door.col = getRandomInt(minCol, maxCol)
		fnReturn.top.door.row = room.startRow -1;		
	}

	if(bottomEnoughH && bottomEnoughW) {
		let minCol = Math.max(room.startCol, fnReturn.bottom.startCol);
		let maxCol = Math.min(room.endCol, fnReturn.bottom.endCol)

		fnReturn.bottom.door = {}
		fnReturn.bottom.door.col = getRandomInt(minCol, maxCol)
		fnReturn.bottom.door.row = room.endRow +1;		
	}

	return fnReturn;
}	
export default getChildren;
// still need to check the max space available

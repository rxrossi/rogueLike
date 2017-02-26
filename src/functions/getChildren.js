const getChildren = (
	  spaceAround, room, {minW, maxW, minH, maxH} 
) => {
	const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min +1)) + min;

	//left
		let left = {};
		left.endCol = spaceAround.left.endCol- 1;

		left.minStartCol = left.endCol - maxW;
		left.maxStartCol = left.endCol - minW;
		left.startCol = getRandomInt(left.minStartCol, left.maxStartCol);	

		left.minStartRow = (spaceAround.left.startRow) > (room.startRow +1 - maxH) ? (spaceAround.left.startRow) : (room.startRow +1 -max); 
		left.maxStartRow = (room.endRow -1) < (spaceAround.left.endRow - minH) ? (room.endRow -1) : (spaceAround.left.endRow - minH);
		left.startRow = getRandomInt(left.minStartRow, left.maxStartRow);

		left.minEndRow = (left.startRow + minH) > (room.startRow +1) ? (left.startRow + minH) : (room.startRow +1) ; 
		left.maxEndRow = spaceAround.left.endRow < (left.startRow + maxH) ? spaceAround.left.endRow : (left.startRow + maxH); 
		left.endRow = getRandomInt(left.minEndRow, left.maxEndRow);
	
	//right
		let right = {};
		right.startCol = spaceAround.right.startCol+1;
		
		right.minEndCol = right.startCol + minW;
		right.maxEndCol = right.startCol + maxW;
		right.endCol = getRandomInt(right.minEndCol, right.maxEndCol)

		right.minStartRow = (spaceAround.right.startRow) > (room.startRow +1 - maxH) ? (spaceAround.right.startRow) : (room.startRow +1 -max); 
		right.maxStartRow = (room.endRow -1) < (spaceAround.right.endRow - minH) ? (room.endRow -1) : (spaceAround.right.endRow - minH);
		right.startRow = getRandomInt(right.minStartRow, right.maxStartRow);

		right.minEndRow = (right.startRow + minH) > (room.startRow +1) ? (right.startRow + minH) : (room.startRow +1) ; 
		right.maxEndRow = spaceAround.right.endRow < (right.startRow + maxH) ? spaceAround.right.endRow : (right.startRow + maxH); 
		right.endRow = getRandomInt(right.minEndRow, right.maxEndRow);

	
	//top
		let top = {};
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

	//bottom
		let bottom = {};
		bottom.startRow = spaceAround.bottom.startRow+1;

		bottom.minEndRow = bottom.startRow + minH;
		bottom.maxEndRow = bottom.startRow + maxH;
		bottom.endRow = getRandomInt(bottom.minEndRow, bottom.maxEndRow)

		bottom.minStartCol = (spaceAround.bottom.startCol) > (room.startCol +1 - minW) ? (spaceAround.bottom.startCol) : (room.startCol +1 -minW);
		bottom.maxStartCol = (room.endCol -1) < (spaceAround.bottom.endCol - minW) ? (room.endCol -1) : (spaceAround.bottom.endCol - minW); 
		bottom.startCol = getRandomInt(bottom.minStartCol, bottom.maxStartCol)

		bottom.minEndCol =  bottom.startCol + minW; 
		bottom.maxEndCol =  spaceAround.bottom.endCol  < (bottom.startCol + maxW) ? spaceAround.bottom.endCol : (bottom.startCol + maxW);
		bottom.endCol = getRandomInt(bottom.minEndCol, bottom.maxEndCol)


	return {
		left,
		right,
		top,
		bottom
	}
}	
export default getChildren;
// still need to check the max space available

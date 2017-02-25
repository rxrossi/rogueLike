const getChildren = (
	  spaceAround, room, {minW, maxW, minH, maxH} 
) => {
	const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min +1)) + min;
	
	//Left coords
	let left = {}
		// horizontal
			left.endCol = room.startCol -1;
			left.startCol = getRandomInt(left.endCol - maxW, left.endCol - minW)
		//vertical
			left.startRow = getRandomInt(spaceAround.left.startRow, room.endRow-1); 
			let minEndRow = (left.startRow + minH) > room.startRow 
											? (left.startRow + minH)
											: (room.startRow + 1);
			let maxEndRow = (left.startRow + maxH) < spaceAround.left.endRow 
											? (left.startRow + maxH)
											: spaceAround.left.endRow;
			left.endRow = getRandomInt(minEndRow, maxEndRow);
	//Right coords
	let right = {}
		// horizontal
			right.startCol = room.endCol +1;
			right.endCol = getRandomInt(right.startCol + minW, right.startCol + maxW)
		//vertical
			right.startRow = getRandomInt(spaceAround.right.startRow, room.endRow-1); 
			minEndRow = (right.startRow + minH) > room.startRow 
											? (right.startRow + minH)
											: (room.startRow + 1);
			maxEndRow = (right.startRow + maxH) < spaceAround.right.endRow 
											? (right.startRow + maxH)
											: spaceAround.right.endRow;
			right.endRow = getRandomInt(minEndRow, maxEndRow);


	return {
		left,
		right
	}
}	
export default getChildren;
// still need to check the max space available

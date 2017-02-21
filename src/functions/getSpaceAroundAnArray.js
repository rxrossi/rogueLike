//The first four params are the object, the last is the array that has it
const getSpaceAroundAnArray = (
	startRow, startCol, endRow, endCol, array, freeSpace
) => {

	//To left
		let spacesLeft = [];
		for (let row = 0 ; row < array.length; row++) {
			spacesLeft[row] = 0;
			//console.log("row", row);
			for (let col = startCol-1; col >= 0 ; col--) {
				//console.log("row", row, "col", col, "value", array[row][col])
				if (array[row][col] !== freeSpace) break;
				spacesLeft[row]++
			}	
			
		}
		
	//To Right
		let spacesRight = [];
		for (let row = 0; row < array.length; row++) {
			spacesRight[row] = 0;
			for (let col = endCol+1; col < array[row].length; col++) {
				if (array[row][col] !== freeSpace) break;
				spacesRight[row]++
			}	
		}	
		const partCorrespondingToRoomSize = spacesRight.slice(startRow,endRow+1)
		//partCorrespondingToRoomSize.forEach( (el, index) => 
		//	console.log("limited row:", index, "number of cols free from 0 col:", el)	
		//)
		const numberOfspacesAvailableOnEveryRow = Math.min(... partCorrespondingToRoomSize);
		//console.log("spaces available to right on every row:", numberOfspacesAvailableOnEveryRow)
		
		const rightStartCol = endCol+1
		const rightEndCol   = rightStartCol+numberOfspacesAvailableOnEveryRow;

		//need to calc rightStartRow, rightEndRow
	  
		//returnStartRow logic
		let rightStartRow = startRow;
		for (let row = startRow; row >= 0; row--) {
			if (spacesRight[row] < numberOfspacesAvailableOnEveryRow) break;
			//console.log("row being tested:", row);
			rightStartRow = row;
		}	

		//returnEndRow logic
		let rightEndRow = endRow;
		for (let row = endRow; row < array.length; row++) {
			if (spacesRight[row] < numberOfspacesAvailableOnEveryRow) break;
			rightEndRow = row;
		}	

		console.log(
			"startRow:", rightStartRow, "startCol:", rightStartCol,
			"endRow:", rightEndRow, "endCol:", rightEndCol
		);
		



	//To Top
		let spacesTop = [];
		for (let row = startRow-1; row >= 0 ; row--) {
			spacesTop[row]=0;
			for (let col = 0; col < array[row].length; col++) {
				if(array[row][col] !== freeSpace) break;
				spacesTop[row]++;
			}	
		}	

	//To Bottom
		//shoud modify to cols/rows instead of rows/cols
		let spacesBottom = [];
		for (let row = endRow+1; row < array.length; row++) {
			spacesBottom[row] = 0;
			for (let col = 0; col < array[row].length; col++) {
				//console.log("row", row, "col", col, "value", array[row][col])
				if(array[row][col] !== freeSpace) break;
				spacesBottom[row]++;
			}	
		}	

	return {
		left: spacesLeft,
		right: [ rightStartRow, rightStartCol, rightEndRow, rightEndCol ],
		top: spacesTop,
		bottom: spacesBottom
	}
}	
export default getSpaceAroundAnArray;

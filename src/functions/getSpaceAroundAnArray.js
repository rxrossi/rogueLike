//The first four params are the object, the fifth is the array that has it, freeSpace is the value that would be considered free space on the map
//TODO: refactor mainly right side detection
//TODO: see if there is a way to make the code with less repetition
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
		const leftShadow = spacesLeft.slice(startRow,endRow+1)
		const numberOfColsOfMinorRowOfLeftShador = Math.min(... leftShadow);

		const leftStartCol = startCol - numberOfColsOfMinorRowOfLeftShador;
		const leftEndCol   = startCol -1;

		//leftStartRow logic
		let leftStartRow = startRow;
		for (let row = startRow; row >= 0; row--) {
			if (spacesLeft[row] < numberOfColsOfMinorRowOfLeftShador) break;
			leftStartRow = row;
		}

		//leftEndRow logic
		let leftEndRow = endRow;
		for (let row = endRow; row < array.length; row++) {
			if (spacesLeft[row] < numberOfColsOfMinorRowOfLeftShador) break;
			leftEndRow = row;
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
		const rightEndCol   = endCol+numberOfspacesAvailableOnEveryRow;

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

		//console.log(
		//	"startRow:", rightStartRow, "startCol:", rightStartCol,
		//	"endRow:", rightEndRow, "endCol:", rightEndCol
		//);

	//To Top
		let spacesTop = [];
		for (let col = 0 ; col < array[0].length; col++) {
			spacesTop[col]=0;
			for (let row = startRow -1 ; row >= 0; row--) {
				if(array[row][col] !== freeSpace) break;
				spacesTop[col]++;
			}
		}
		const topShadow = spacesTop.slice(startCol, endCol+1)
		const numberOfRowsOnMinorColOfTopShadow = Math.min(... topShadow)

		let topEndRow   = startRow -1;
		let topStartRow = startRow - numberOfRowsOnMinorColOfTopShadow;

		let topStartCol;
		for (let col = startCol ; col >= 0; col--) {
			if(spacesTop[col] < numberOfRowsOnMinorColOfTopShadow) break;
			topStartCol = col;
		}

		//logic to get the bottomEndCol
		let topEndCol = endCol;
		for (let col = endCol; col < array[0].length; col++) {
			if(spacesTop[col] < numberOfRowsOnMinorColOfTopShadow) break;
			topEndCol = col;
		}

	//To Bottom
		let spacesBottom = [];
		for (let col = 0; col < array[0].length; col++) {
			//console.log("col", col)
			spacesBottom[col]=0;
			for (let row = endRow+1; row < array.length ; row++) {
				if(array[row][col] !== freeSpace) break;
				spacesBottom[col]++;
			}
		}
		//console.log("spaces bottom", spacesBottom);
		const bottomShadow = spacesBottom.slice(startCol,endCol+1)
		//console.log("bottomShadow", bottomShadow);
		const numberOfRowsOnMinorColOfBottomShadow = Math.min(... bottomShadow)

		let bottomStartRow = endRow+1;
		let bottomEndRow   = endRow + numberOfRowsOnMinorColOfBottomShadow;

		//logic to get bottomStartCol
		let bottomStartCol;
		for (let col = startRow ; col >= 0; col--) {
			if(spacesBottom[col] < numberOfRowsOnMinorColOfBottomShadow) break;
			bottomStartCol = col;
		}

		//logic to get the bottomEndCol
		let bottomEndCol = endCol;
		for (let col = endCol; col < array[0].length; col++) {
			if(spacesBottom[col] < numberOfRowsOnMinorColOfBottomShadow) break;
			bottomEndCol = col;
		}


	return {
		left: [ leftStartRow, leftStartCol, leftEndRow, leftEndCol ],
		right: [ rightStartRow, rightStartCol, rightEndRow, rightEndCol ],
		top: [ topStartRow, topStartCol, topEndRow, topEndCol ],
		bottom: [ bottomStartRow, bottomStartCol, bottomEndRow, bottomEndCol ]
	}
}
export default getSpaceAroundAnArray;

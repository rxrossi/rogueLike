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
		partCorrespondingToRoomSize.forEach( (el, index) => 
			console.log("limited row:", index, "number of cols free from 0 col:", el)	
		)
		const minorNumber = Math.min(... partCorrespondingToRoomSize);
		console.log("minor numer",minorNumber)



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
		right: spacesRight,
		top: spacesTop,
		bottom: spacesBottom
	}
}	
export default getSpaceAroundAnArray;

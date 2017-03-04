const make2dArray = (width, height, fill) => {
	let array = [];
	for (let row = 0; row < height; row++) {
		array[row] = [];
		for (let col = 0; col < width; col++) {
			array[row][col] = fill;	
		}	
	}	
	return array;
}	
export default make2dArray;

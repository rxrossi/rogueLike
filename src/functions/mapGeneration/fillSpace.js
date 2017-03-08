const fillSpace = (
	{ startRow, startCol, endRow, endCol }, array, fillWith, selectedSide
) => {
	for (let row = startRow; row <= endRow; row++) {
		for (let col = startCol; col <= endCol; col++) {
				array[row][col] = fillWith;
		}
	}
	return array;
}
export default fillSpace;

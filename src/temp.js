let motherRooms = [];

while (motherRooms.length > 0) {
	const mother = motherRooms[0];

	let children = [];
	// create children and add to children
	
	/*
	 * - get sides available, put in an array, select one side randomly
	 *   - supose it is the right side
	 *   - get mother startRow,Encol (1), endRow,Endcol (2)
	 *				xx1
	 *				xxx
	 *				xx2
	 *
	 *				pick randomly row between startRow and EndRow, exclude extremes and store as door[row,col]
	 *
	 *				get available drawing area to right side
	 *				
	 *		       | |
	 *		       | |XXX
	 *		       | |XXX
	 *				XXX| |XXX
	 *				XXX| |XXX
	 *				XXX|D|XXX
	 *				XXX| |XXX
	 *				XXX| |XXX
	 *				XXX| |XXX
	 *
	 *				The right side XXX is where the child will be created
	 *
	 *				child.startRow > availableSpace.startRow, child.startRow < D.row
	 *				child.endRow < avaibleSpace.endRow, child.endRow > D.row
	 *				
	 * */			
	
	while(children.length > 0) { //remove child from children, pass to motherRooms
		motherRooms.push(children[0])
		children.shift()
	}	
}

import make2dArray from './make2dArray.js';
import fillSpace from './fillSpace.js';
import getSpaceAround from './getSpaceAround.js';
import getChildren from './getChildren.js';


//{width and height of map}, {min W and H of rooms}
const mapGenerator = ( {mapW, mapH}, roomSize ) => {

	const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	let map = make2dArray(mapW, mapH, "wall");

	//first room coords
	const firstMotherRoom = {}
	firstMotherRoom.startRow= getRandomInt(1,15);
	firstMotherRoom.startCol= getRandomInt(1,15);

	firstMotherRoom.endRow=
		getRandomInt(firstMotherRoom.startRow+roomSize.minH, firstMotherRoom.startRow+roomSize.maxH);

	firstMotherRoom.endCol=
		getRandomInt(firstMotherRoom.startCol+roomSize.minW, firstMotherRoom.startCol+roomSize.maxW);

  //Place the first room
	map = fillSpace({...firstMotherRoom}, map, "floor")

	let motherRooms = []

	motherRooms.push(firstMotherRoom);

	let i = 10;
	while (i > 0) {
		const mother = motherRooms[0]
		const spaceAround = getSpaceAround({...mother}, map, "wall")

		const children = getChildren(spaceAround, mother, {...roomSize});

		const sidesAvailable = Object.keys(children);
		if (sidesAvailable.length > 0) {
			const sideToDrawChild = sidesAvailable[getRandomInt(0, sidesAvailable.length-1)];
			map = fillSpace({...children[sideToDrawChild]}, map, "floor");
			const doorRow = children[sideToDrawChild].door.row;
			const doorCol = children[sideToDrawChild].door.col;

			map[doorRow][doorCol] = "floor";
			motherRooms.push(children[sideToDrawChild]);
		}
		motherRooms.shift();
		i -= 1;
	}

	return map;
}

export default mapGenerator;

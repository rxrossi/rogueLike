import make2dArray from './make2dArray.js';
import fillSpace from './fillSpace.js';
import getSpaceAround from './getSpaceAround.js';
import getChildren from './getChildren.js';


//{width and height of map}, {min W and H of rooms}
const mapGenerator = ( {mapW, mapH}, roomSize, minNumberOfRooms = 10 ) => {

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
	try {
		map = fillSpace({...firstMotherRoom}, map, "floor")
	} catch (err) {
		console.log("could not place the first room: ",err);
	}
	let motherRooms = []

	motherRooms.push(firstMotherRoom);

	let success = 0;
	for (let i = 0; i < minNumberOfRooms; i++) {
		let mother = motherRooms[0]
		//console.log(mother)
		if (mother) {
			success +=1;
		}
		const spaceAround = getSpaceAround({...mother}, map, "wall")

		const possibleChildren = getChildren(spaceAround, mother, {...roomSize});

		const sidesAvailable = Object.keys(possibleChildren);

		if (sidesAvailable.length > 0) {
			const sideToDrawChild = sidesAvailable[getRandomInt(0, sidesAvailable.length-1)];
			map = fillSpace({...possibleChildren[sideToDrawChild]}, map, "floor");
			const doorRow = possibleChildren[sideToDrawChild].door.row;
			const doorCol = possibleChildren[sideToDrawChild].door.col;
			map[doorRow][doorCol] = "floor";
			motherRooms.push(possibleChildren[sideToDrawChild]);
			motherRooms.shift();
		} else {
			//console.log('not enough sides available');
			break;
		}
	}
	//console.log("success: ",success)
	if (success < minNumberOfRooms) {
		//console.log("not all rooms were created, trying again")
		return mapGenerator( {mapW, mapH}, roomSize, minNumberOfRooms );
	} else {
		return map;
	}
}

export default mapGenerator;

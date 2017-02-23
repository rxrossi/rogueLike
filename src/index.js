import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';

//import functions
import make2dArray from './functions/make2dArray.js';
import fillSpecificPartOf2dArray from './functions/fillSpecificPartOf2dArray.js';
import getSpaceAroundAnArray from './functions/getSpaceAroundAnArray.js';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//import components
import Map from './components/Map.js';

let map = make2dArray(20,20, "wall");

const firstMotherRoom = [1,1,3,3]
map = fillSpecificPartOf2dArray(
	firstMotherRoom[0],firstMotherRoom[1],firstMotherRoom[2], firstMotherRoom[3],
	map, "floor")

let motherRooms = []

motherRooms.push(firstMotherRoom);

while (motherRooms.length > 0) {
	const freeSpaceAroundMother = getSpaceAroundAnArray(
		firstMotherRoom[0], firstMotherRoom[1], firstMotherRoom[2], firstMotherRoom[3],
		map, "wall"
	);
	console.log(freeSpaceAroundMother);
	const widthOfRoom = getRandomInt(4,8);
	const heightOfRoom = getRandomInt(4,10);

	console.log(widthOfRoom)

	if (
		heightOfRoom <= freeSpaceAroundMother.bottom[2] - freeSpaceAroundMother.bottom[0]
		&&
		widthOfRoom <= freeSpaceAroundMother.bottom[3] - freeSpaceAroundMother.bottom[1]
	) {
		map = fillSpecificPartOf2dArray(
			freeSpaceAroundMother.bottom[0]+1,
			freeSpaceAroundMother.bottom[1],
			freeSpaceAroundMother.bottom[0]+1 + heightOfRoom,
			freeSpaceAroundMother.bottom[1] + widthOfRoom,
			map,
			"floor"

		);
	}
	motherRooms.shift();
}

ReactDOM.render(
  <Map map={map} />,
  document.getElementById('root')
);

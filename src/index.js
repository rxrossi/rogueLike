import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';

//import functions
import make2dArray from './functions/make2dArray.js';
import fillSpace from './functions/fillSpace.js';
import getSpaceAround from './functions/getSpaceAround.js';
import getChildren from './functions/getChildren.js';
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//import components
import Map from './components/Map.js';

let map = make2dArray(40,40, "wall");

const firstMotherRoom = {startRow: 15, startCol: 15, endRow: 25, endCol: 25}
map = fillSpace({...firstMotherRoom}, map, "floor")

let motherRooms = []

motherRooms.push(firstMotherRoom);

while (motherRooms.length > 0) {
	const mother = motherRooms[0]
	//console.log(mother)
	const spaceAround = getSpaceAround({...mother}, map, "wall")
	//console.log(spaceAround);
	const children = getChildren(spaceAround, mother, {minW: 5, minH:5, maxH:15, maxW:15});
	//console.log("children", children)
  //TODO: I completely forgot to add doors to get children	
	map = fillSpace({...children.top}, map, "floor")
	motherRooms.shift();
}

ReactDOM.render(
  <Map map={map} />,
  document.getElementById('root')
);

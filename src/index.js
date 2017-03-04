import React from 'react';
import { connect, Provider} from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import './index.css';

//TODO: implement a counter with succesful rooms created, if less than something, redo
//TODO: sometimes the right rooms goes one col over the space
//TODO: perfom cleanup on index.js moving things to their files

//import functions
import make2dArray from './functions/make2dArray.js';
import fillSpace from './functions/fillSpace.js';
import getSpaceAround from './functions/getSpaceAround.js';
import getChildren from './functions/getChildren.js';
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//import components
import MapComponent from './components/Map.js'

// Map related stuff
const mapW = 50;
const mapH = 50;

const roomSize = {
	minW: 4,
	maxW: 8,
	minH: 4,
	maxH: 8,
}

let map = make2dArray(mapW, mapH, "wall");

const firstMotherRoom = {}
firstMotherRoom.startRow= getRandomInt(1,15);
firstMotherRoom.startCol= getRandomInt(1,15);
firstMotherRoom.endRow=
	getRandomInt(firstMotherRoom.startRow+roomSize.minH, firstMotherRoom.startRow+roomSize.maxH);
firstMotherRoom.endCol=
	getRandomInt(firstMotherRoom.startCol+roomSize.minW, firstMotherRoom.startCol+roomSize.maxW);


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
// Non map stuff

const getFreeSpace = (map) => {
	let freeSpaces = [];
	for (let row = 0; row < map.length ; row++) {
		for (let col = 0; col < map[row].length; col++) {
			if (map[row][col] === "floor") freeSpaces.push([row, col])
		}
	}
	return freeSpaces;
}

const freeSpaceHandler = {
	freeSpace: getFreeSpace(map),

	get: () => {
		const index = getRandomInt(0, freeSpaceHandler.freeSpace.length);

		const toReturn = {
			row: freeSpaceHandler.freeSpace[index][0],
			col: freeSpaceHandler.freeSpace[index][1]
		}
		freeSpaceHandler.freeSpace = [
			...freeSpaceHandler.freeSpace.slice(0, index),
			...freeSpaceHandler.freeSpace.slice(index+1)
		]
		return toReturn;
	}
}

const player = {
	...freeSpaceHandler.get(),
  hp: 1000,
  attack: 25
}

const enemies = [
  {id: 0, ...freeSpaceHandler.get(), hp: 100, attack: 25},
  {id: 1, ...freeSpaceHandler.get(), hp: 100, attack: 25},
]

const items = [
  {id: 0, type:'health', ...freeSpaceHandler.get(), value: 100, onMap: true },
  {id: 1, type:'weapon', ...freeSpaceHandler.get(), onMap: true, name:'shoes', attack: 50 }
]

const initialState = {
	map,
  player,
  enemies,
  items
}

//reducers
const gameReducer = (state = {}, action) => {
  switch(action.type) {
    case 'MOVE_PLAYER':
      return {
        ...state,
        player: {...state.player, row: action.destination.row, col: action.destination.col }
      }
    case 'FIGHT':
      // console.log(action)
      const enemyIndex = state.enemies.findIndex(enemy => enemy.id === Number(action.enemy.id));
      // console.log(enemyIndex);
      return {
        ...state,
        player: {...state.player, hp: action.playerHp},
        enemies: [...state.enemies.slice(0, enemyIndex),
                  action.enemy,
                  ...state.enemies.slice(enemyIndex+1)]

      }
    case 'GAINED_LIFE_FROM_ITEM':
      console.log("interacting with item", action)
      const itemIndex = state.enemies.findIndex(item => item.id === Number(action.item.id));

      const updatedPlayer = {...state.player,
        hp: action.playerHp,
        row: action.item.row, col: action.item.col};

      return {
        ...state,
        player: updatedPlayer,
        items: [
          ...state.items.slice(0, itemIndex),
          action.item,
          ...state.items.slice(itemIndex)
        ]
      }
    default:
      return state;
  }
}


//store
let store = createStore(gameReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <MapComponent />
  </Provider>,
  document.getElementById('root')
);


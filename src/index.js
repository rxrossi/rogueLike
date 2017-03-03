import React from 'react';
import { connect, Provider} from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import './index.css';

//import functions
import make2dArray from './functions/make2dArray.js';
import fillSpace from './functions/fillSpace.js';
import getSpaceAround from './functions/getSpaceAround.js';
import getChildren from './functions/getChildren.js';
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//TODO: implement a counter with succesful rooms created, if less than something, redo
//TODO: sometimes the right rooms goes one col over the spave
//TODO: position items and player in a random way
//			- write a function for checking free spaces
//			- each item or enermy must be positioned after the player
//			- randomFreeSpace calcs on the map, it is possible that two items receive the same
//			position if randomFreeSpace is called without positioning the previous thing on the map
//TODO: player old position, used items and killed enemy are being removed on render, not really on map
//
//There are two things that I can do, one is to map be a string like "floor player", but it does not need to be floor, if something is not a "enemy" or "item" it was a "floor"
//putting player on map will make it harder to control the player, each time it will need to find in a two 2d array the player position or not if I also store it on the player, this would create  redundancy of data
//
//A good idea might be that every item is postioned on the map and does not have its own position, but player do, as items does not move, this might make sense
//it is better to let things the way they are with the render, they make sense
//to avoid duplication I need to split randomSpace into something like readFreeSpaces and store it on the array, them another function that would return {row, col} and remove it from from freeSpaces array
//it could be interesting to add used positions to another array
//Action creators
  const movePlayer = (destination) => ({
    type: 'MOVE_PLAYER',
    destination
  })

  const fight = (dataOfFight) => ({
    type: 'FIGHT',
    enemy: dataOfFight.updatedEnemy,
    playerHp: dataOfFight.updatedPlayerHp
  })

  const gainLifeFromItem = (dataOfInteraction) => ({
    type: 'GAINED_LIFE_FROM_ITEM',
    item: dataOfInteraction.updatedItem,
    playerHp: dataOfInteraction.updatedPlayerHp
  })

  const takeWeaponFromGround = (dataOfInteraction) => ({
    type: 'TAKE_WEAPON_FROM_GROUND',
    item: dataOfInteraction.item,
    playerAttack: dataOfInteraction.playerAttack
  })

  const removeEntity = (entity) => ({
    type: 'REMOVE_ENTITY',
    row: entity.row,
    col: entity.col
  })

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

class MapComponent extends React.Component {

componentWillReceiveProps() {
  map[this.props.player.row][this.props.player.col] = "floor";
  enemies.forEach( enemy => map[enemy.row][enemy.col] = "floor")
  items.forEach( item => map[item.row][item.col] = "floor")
}

componentDidMount() {
  window.addEventListener("keydown", (e) => {
    // console.log(e.keyCode);
    switch (e.keyCode) {
      case 37:
        this.playerMove("LEFT")
        break;
      case 38:
        this.playerMove("TOP")
        break;
      case 39:
        this.playerMove("RIGHT")
        break;
      case 40:
        this.playerMove("BOTTOM")
        break;

      default:
        break;
    }
  })
}

playerMove(input) {
  const { map, enemies, player } = this.props;

  this.calcDestination = (player, input) => {
    switch (input) {
      case 'LEFT':
        return {col:player.col -1,   row: player.row};
      case 'TOP':
        return {col:player.col,      row: player.row-1};
      case 'RIGHT':
        return {col:player.col +1,   row: player.row};
      case 'BOTTOM':
        return {col:player.col,      row: player.row+1};
      default:
        return {col:player.col, row: player.row}
    }
  }
  const destination = this.calcDestination(this.props.player, input);

  this.checkDestination = (destination, map) => {
    return map[destination.row][destination.col];
  }

  this.calcFightResult = (enemyId) => {
    // console.log(enemyId);
    let enemy = enemies.find(enemy => enemy.id == enemyId);
    // console.log(enemy);
    enemy.hp = enemy.hp - player.attack;
    const playerHp = player.hp - enemy.attack;
    return {updatedEnemy: enemy, updatedPlayerHp: playerHp}
  }

  this.interactWithItem = (itemId) => {
    let item = items.find(item => item.id == itemId);

    switch (item.type) {
      case 'health':
        const playerHp = player.hp + item.value;
        item.onMap = false;
        return {updatedItem: item, updatedPlayerHp: playerHp }
      case 'weapon':
        const playerAttack = item.attack;
        item.onMap = false;
        return {updatedItem: item, updatedPlayerAttack: playerAttack }
    }
  }


  const whatIsOnDestination = this.checkDestination(destination, map).split(" ")
		switch(whatIsOnDestination[0]){
			case 'floor':
					store.dispatch(movePlayer(destination));
				break;
			case 'enemy':
					const dataOfFight = this.calcFightResult(whatIsOnDestination[1]);
					store.dispatch(
						fight(dataOfFight)
					)
				break;
			case 'health':
				player.hp < 1000 ?
				store.dispatch(
						gainLifeFromItem(this.interactWithItem(whatIsOnDestination[1]))
					)
				: store.dispatch(movePlayer(destination));
			default:
				console.log("Something blocking the way, unkown entity type: ",this.checkDestination(destination, map));
				break;
		}
}


render() {
  const { player, map } = this.props;
  const { enemies, items } = this.props;


  enemies.forEach( enemy => enemy.hp > 0 ? map[enemy.row][enemy.col] = "enemy "+enemy.id : '' );
  items.forEach( item => item.onMap ? map[item.row][item.col] = item.type+" "+item.id : '');

  map[player.row][player.col] = "player";
  return (
    <div>
      <div> Player row: {player.row}, Player col: {player.col} </div>
      <div> Player HP: {player.hp}</div>
      {
        map.map( (row, rowKey) => {
          return (
            <div key={rowKey} className="row">
              {
                row.map( (cell, cellKey) => {
                  return (
                    <div className={cell} key={rowKey+''+cellKey}>
                      {rowKey} {cellKey}
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

} //MapComponent
const mapMapComponentStateToProps = (state) => ({
  map: state.map,
  player: state.player,
  enemies: state.enemies,
  items: state.items
})

MapComponent = connect(mapMapComponentStateToProps)(MapComponent)

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
      const enemyIndex = state.enemies.findIndex(enemy => enemy.id == action.enemy.id);
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
      const itemIndex = state.enemies.findIndex(item => item.id == action.item.id);

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


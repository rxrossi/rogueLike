import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import './index.css';

//TODO: create splash notifications on LVL UP, damage taken, damage done, health cured and game victory
//TODO: pick item should, on reducer, move player to item location
//TODO: 'You died' dialog should have a button to restart
//			- dialog could have something like msg: string, buttons: [ { buttonName, action}, ]
//TODO: enemy damage must be random
//TODO: change door class from floor to door, gotta edit map generation, playerMove on component/map
//TODO: improve label namming
//TODO: enemy health percentage should not rely on className, other things should not too

//import functions
import setupLvl from './functions/setupLvl'

//import reducers
import reducer from './reducer';

//import components
//import MapComponent from './components/Map.js'

import Game from './containers/Game';

// Map generation

	const sizeOfMap = {
		mapH: 50,
		mapW: 50
	}

	const sizesOfRooms = {
		minW: 4,
		maxW: 8,
		minH: 4,
		maxH: 8,
	}

	const player = {
		maxHp: 1000,
		hp: 1000,
		base_dmg: 25,
		attack: 25,
		weapon: 'none',
		lvl: 1,
		exp: 0,
		maxExp: 100,
	}
	// player stats based on level
	// 1 - hp: 1000, attack: 25
	// 2 - hp: 2000, attack: 50
	// 3 = hp: 3000, attack: 75

	const mapLevel = 0;

	const initialState = {
		...setupLvl(mapLevel, player, sizeOfMap, sizesOfRooms),
		sizeOfMap,
		sizesOfRooms,
		mapLevel,
		darkness: true,
	}

//store
	let store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);


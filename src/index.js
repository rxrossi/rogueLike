import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import './index.css';

//TODO: put a boss at the last floor
//TODO: make the player die if health <= 0
//TODO: create splash notifications on LVL UP, damage taken, damage done, health cured

//import functions
import setupLvl from './functions/setupLvl'

//import reducers
import reducer from './reducer';

//import components
import MapComponent from './components/Map.js'

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
	}

//store
	let store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <MapComponent />
  </Provider>,
  document.getElementById('root')
);


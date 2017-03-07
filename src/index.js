import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import './index.css';

//TODO: implement a counter with succesful rooms created, if less than something, redo
//TODO: sometimes the right rooms goes one col over the space
//TODO: perfom cleanup on index.js moving things to their files
//			- need to automate etities generation (items, enemies and healh)
//			-- it will be necessary to already implement level calculation (map level)
//TODO: the map component playerMove can be improve a lot
//			- it is possible that checkDestination can be convertead to a IIFE

//import functions
import mapGenerator from './functions/mapGeneration'
import freePositionsClass from './functions/freePositionsClass'

//import reducers

import reducer from './reducer';

//import components
import MapComponent from './components/Map.js'

// Map generation
	const mapW = 50;
	const mapH = 50;

	const roomSize = {
		minW: 4,
		maxW: 8,
		minH: 4,
		maxH: 8,
	}

	const player = {
		hp: 1000,
		attack: 25
	}

function setupLevel(level, player) {
	// player stats based on level
	// 1 - hp: 1000, attack: 25
	// 2 - hp: 2000, attack: 50
	// 3 = hp: 3000, attack: 75

	let map = mapGenerator({mapW, mapH}, roomSize)

	const freeSpaceHandler = new freePositionsClass(map);

	function enemiesCreatorAndPositioner(
		level, freeSpaceHandler, qty, base_hp, base_attack, base_exp
		) {

		let hp = base_hp * (level + 1);
		let attack = base_attack * (level +1);
		let enemies = [];
		qty += level;
		let exp = base_exp * (level + 1);
		for (let i = 0; i < qty; i++) {
			enemies.push(
				{id: i, ...freeSpaceHandler.get(), hp, attack, exp}
			)
		}
		return enemies;
	}

	//total damage of enemy === health / player attack * enemy attack
	// lvl 1 - 200 / 25(unarmed) * 100 = 800 or 300 if player armed
	// lvl 2 - 400 / 50 or 110 * 200 = 1000 if lvl2 + broom, or 500 if with wp2
	// lvl 3 - 600 / 75 or 195 * 300 = 2400 or 900
	// lvl 4 - 800 / 100 or 300 * 400 = 3200 or 1200 with weapon


	function healthCreatorAndPositioner(level, freeSpaceHandler, qty, base_hp, onMap = true) {
		let healths = [];
		let hp = base_hp * (level+1)
		qty += level;
		for (let i = 0; i < qty; i++) {
			healths.push(
				{id: 'health' + i, type:'health', value: hp, onMap, ...freeSpaceHandler.get()}
			)
		}
		return healths;
	}

	const weapons = [
		{id:'wp1', type:'weapon', onMap: true, name:'Broom', atack: 30, ...freeSpaceHandler.get()},
		{id:'wp2', type:'weapon', onMap: true, name:'Broom with sharp knife', atack: 60,  ...freeSpaceHandler.get()},
		{id:'wp3', type:'weapon', onMap: true, name:'Sword', atack: 100, ...freeSpaceHandler.get()},
		{id:'wp3', type:'weapon', onMap: true, name:'Fire sword', atack: 150, ...freeSpaceHandler.get()},
	];

	const enemies = enemiesCreatorAndPositioner(level, freeSpaceHandler, 5, 200, 70);
	const items = [
		...healthCreatorAndPositioner(level, freeSpaceHandler, 3, 200),
		weapons[level]
	]

	player = {
		...player,
		...freeSpaceHandler.get()
	}

	return {
		map,
		enemies,
		items,
		player
	}
}

	const initialState = {
		...setupLevel(0, player),
	}

//store
	let store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <MapComponent />
  </Provider>,
  document.getElementById('root')
);


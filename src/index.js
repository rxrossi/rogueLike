import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import './index.css';

//TODO: create splash notifications on LVL UP, damage taken, damage done, health cured and game victory
//TODO: 'You died' dialog should have a button to restart
//			- dialog could have something like msg: string, buttons: [ { buttonName, action}, ]
//TODO: change door class from floor to door, gotta edit map generation, playerMove on component/map
//TODO: enemy health percentage should not rely on className, other things should not too
//TODO: add sass and css modules

//import functions
import setupLvl from './functions/setupLvl'

//import reducers
import reducer from './reducer';

//import components
import Game from './containers/Game';

// Map generation
	import { mapLevel, player, sizeOfMap, sizesOfRooms, dialogData } from './startingData';
	const initialState = {
		...setupLvl(mapLevel, player, sizeOfMap, sizesOfRooms),
		sizeOfMap,
		sizesOfRooms,
		mapLevel,
		darkness: true,
		dialogData
	}

//store
	let store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);


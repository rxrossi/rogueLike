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

	let map = mapGenerator({mapW, mapH}, roomSize)

// Entities creation and positioning
	const freeSpaceHandler = new freePositionsClass(map);

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

//store
	let store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <MapComponent />
  </Provider>,
  document.getElementById('root')
);


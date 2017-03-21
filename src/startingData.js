import { clearNotification } from './actions';

export const sizeOfMap = {
	mapH: 50,
	mapW: 50
}

export const sizesOfRooms = {
	minW: 4,
	maxW: 8,
	minH: 4,
	maxH: 8,
}

export const player = {
	maxHp: 1000,
	hp: 1000,
	base_dmg: 25,
	attack: 25,
	weapon: 'none',
	lvl: 1,
	exp: 0,
	maxExp: 100,
}

export const mapLevel = 0;

export const dialogData = {
	msg: 'You are dreaming, there are some enemies to kill, some weapons to pick. You Should try to gain as much experience as you can, and find the exits until you find the boss, end it!',
	buttons: [ { label: 'OK', action: clearNotification } ]
};


import mapGenerator from '../mapGeneration'
import freePositionsClass from '../freePositionsClass'

const setupLevel = (mapLevel, player, {mapW, mapH}, sizesOfRooms) => {

	let map = mapGenerator({mapW, mapH}, sizesOfRooms, 15)

	const freeSpaceHandler = new freePositionsClass(map);

	const aFreeSpace = freeSpaceHandler.get();

	if (mapLevel < 3) {
		map[aFreeSpace.row][aFreeSpace.col] = 'exit';
	}

	function enemiesCreatorAndPositioner(
		mapLevel, freeSpaceHandler, qty, base_hp, base_attack, base_exp
		) {

		let hp = base_hp * (mapLevel + 1);
		let attack = base_attack * (mapLevel +1);
		let enemies = [];
		qty += mapLevel;
		let exp = base_exp * (mapLevel + 1);
		for (let i = 0; i < qty; i++) {
			enemies.push(
				{id: 'melee'+i, ...freeSpaceHandler.get(), hp, maxHp: hp, attack, exp}
			)
		}
		if (mapLevel === 3) {
			enemies.push(
				{id: 'boss', hp: hp*4, maxHp: hp*4,  attack: attack*4, exp: 0, ...freeSpaceHandler.get()}
			)
		}
		return enemies;
	}

	function healthCreatorAndPositioner(mapLevel, freeSpaceHandler, qty, base_hp, onMap = true) {
		let healths = [];
		let hp = base_hp * (mapLevel+1)
		qty += mapLevel;
		for (let i = 0; i < qty; i++) {
			healths.push(
				{id: 'health' + i, type:'health', value: hp, onMap, ...freeSpaceHandler.get()}
			)
		}
		return healths;
	}

	const weapons = [
		{id:'wp1', type:'weapon', onMap: true, name:'Broom', attack: 30, ...freeSpaceHandler.get()},
		{id:'wp2', type:'weapon', onMap: true, name:'Broom with sharp knife', attack: 60,  ...freeSpaceHandler.get()},
		{id:'wp3', type:'weapon', onMap: true, name:'Sword', attack: 100, ...freeSpaceHandler.get()},
		{id:'wp3', type:'weapon', onMap: true, name:'Fire sword', attack: 150, ...freeSpaceHandler.get()},
	];

	const enemies = enemiesCreatorAndPositioner(mapLevel, freeSpaceHandler, 5, 200, 70, 50);
	const items = [
		...healthCreatorAndPositioner(mapLevel, freeSpaceHandler, 3, 200),
		weapons[mapLevel]
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
export default setupLevel;

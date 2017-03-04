export const movePlayer = (destination) => ({
	type: 'MOVE_PLAYER',
	destination
})

export const fight = (dataOfFight) => ({
	type: 'FIGHT',
	enemy: dataOfFight.updatedEnemy,
	playerHp: dataOfFight.updatedPlayerHp
})

export const gainLifeFromItem = (dataOfInteraction) => ({
	type: 'GAINED_LIFE_FROM_ITEM',
	item: dataOfInteraction.updatedItem,
	playerHp: dataOfInteraction.updatedPlayerHp
})

//const takeWeaponFromGround = (dataOfInteraction) => ({
	//type: 'TAKE_WEAPON_FROM_GROUND',
	//item: dataOfInteraction.item,
	//playerAttack: dataOfInteraction.playerAttack
//})

//const removeEntity = (entity) => ({
	//type: 'REMOVE_ENTITY',
	//row: entity.row,
	//col: entity.col
//})


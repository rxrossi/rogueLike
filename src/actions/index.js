export const movePlayer = (destination) => ({
	type: 'MOVE_PLAYER',
	destination
})

export const fight = (dataOfFight) => ({
	type: 'FIGHT',
	enemy: dataOfFight.updatedEnemy,
	updatedPlayer: dataOfFight.updatedPlayer
})

export const gainLifeFromItem = (dataOfInteraction) => ({
	type: 'GAINED_LIFE_FROM_ITEM',
	item: dataOfInteraction.updatedItem,
	playerHp: dataOfInteraction.updatedPlayerHp
})

export const equipWeapon = (dataOfInteraction) => ({
	type: 'EQUIP_WEAPON',
	item: dataOfInteraction.updatedItem,
	playerAttack: dataOfInteraction.updatedPlayerAttack,
})

export const gainExp = (exp) => ({
	type: 'GAIN_EXP',
	exp
})

export const gainLvl = (data) => ({
	type: 'GAIN_LVL',
})

//const removeEntity = (entity) => ({
	//type: 'REMOVE_ENTITY',
	//row: entity.row,
	//col: entity.col
//})

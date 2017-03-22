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

export const gainLvl = () => ({
	type: 'GAIN_LVL',
})

export const nextMapLvl = () => ({
	type: 'NEXT_MAP_LVL',
})

export const restartGame = () => ({
	type: 'RESTART'
});

export const playerDead = () => ({
	type: 'PLAYER_DEAD',
	msg: 'You are dead',
	buttons: [ {label: 'Retry', action: restartGame } ]
});

export const toggleDarkness = () => ({
	type: 'TOGGLE_DARKNESS'
})

export const sendNotification = ({msg, buttons}) => ({
	type: 'NOTIFY',
	msg,
	buttons
})

export const clearNotification = () => ({
	type: 'CLEAR_NOTIFICATION'
});

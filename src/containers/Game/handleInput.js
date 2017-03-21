export default ({ input, map, enemies, player, items,
								movePlayer, playerDead, gainLvl, gainExp,
								gainLifeFromItem, sendNotification,
								equipWeapon, nextMapLvl, fight }) => {

		let destination = {};

		destination.coords= (function(player, input) {
			switch (input) {
				case 'LEFT':
					return {col:player.col -1,   row: player.row};
				case 'TOP':
					return {col:player.col,      row: player.row-1};
				case 'RIGHT':
					return {col:player.col +1,   row: player.row};
				case 'BOTTOM':
					return {col:player.col,      row: player.row+1};
				default:
					return {col:player.col, row: player.row}
			}
		})(player, input);

    destination.type = map[destination.coords.row][destination.coords.col].split(" ")[0]
    destination.entityId = map[destination.coords.row][destination.coords.col].split(" ")[1]

		switch(destination.type){
			case 'floor':
				movePlayer(destination.coords);
				break;
			case 'enemy':
					const dataOfFight = interatWithEnemy(destination.entityId);
					if (dataOfFight.updatedPlayer.hp <= 0) {
						playerDead();
					}
					fight(dataOfFight)
					if (dataOfFight.updatedEnemy.hp <= 0 ) {
						gainExp(dataOfFight.updatedEnemy.exp)
						if (player.exp + dataOfFight.updatedEnemy.exp >= player.maxExp) {
							gainLvl();
						}
					}
				break;
			case 'health':
				player.hp < player.maxHp
				?	gainLifeFromItem(interactWithItem(destination.entityId))
				: movePlayer(destination.coords);
				break;
			case 'weapon':
				equipWeapon(interactWithItem(destination.entityId))
				break;
			case 'wall':
				break;
			case 'exit':
				nextMapLvl()
				break;
			default:
				console.log("Something blocking the way, unkown entity type: ", destination.type, destination.entityId);
				break;
		}

		function interatWithEnemy(enemyId) {
			let enemy = enemies.find(enemy => enemy.id === enemyId);
			let updatedEnemyHp = enemy.hp - player.attack;
			const updatedPlayer = {...player, hp: Math.max(player.hp - enemy.attack, 0)}
			if (enemyId === 'boss' && updatedEnemyHp <= 0) sendNotification('You won!!!');
			return {updatedEnemy: {...enemy, hp: updatedEnemyHp}, updatedPlayer}
		}

		function interactWithItem(itemId) {
			let item = items.find(item => item.id === itemId);

			switch (item.type) {
				case 'health':
					const playerHp = Math.min(player.hp + item.value, player.maxHp)
					item.onMap = false;
					return {updatedItem: item, updatedPlayerHp: playerHp }
				case 'weapon':
					const playerAttack = player.base_dmg + item.attack;
					item.onMap = false;
					return {updatedItem: item, updatedPlayerAttack: playerAttack }
				default:
					console.log("unknown item type: ", item.type)
					break;
			}
		}
}

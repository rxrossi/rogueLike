const gameReducer = (state = {}, action) => {
  switch(action.type) {
    case 'MOVE_PLAYER':
      return {
        ...state,
        player: {...state.player, row: action.destination.row, col: action.destination.col }
      }
    case 'FIGHT':
      // console.log(action)
      const enemyIndex = state.enemies.findIndex(enemy => enemy.id === Number(action.enemy.id));
      // console.log(enemyIndex);
      return {
        ...state,
				player: action.updatedPlayer,
        enemies: [...state.enemies.slice(0, enemyIndex),
                  action.enemy,
                  ...state.enemies.slice(enemyIndex+1)]

      }
		case 'GAIN_EXP':
			return {
				...state,
				player: {...state.player, exp: state.player.exp + action.exp}
			}
		case 'GAIN_LVL':
			console.log('LVL UP!')
			break;
		case 'EQUIP_WEAPON':
      const weaponId = state.items.findIndex(item => item.id === Number(action.item.id));
			return {
				...state,
				player: {...state.player, weapon: action.item.name, attack: action.playerAttack},
				items: [
					...state.items.slice(0, weaponId),
					action.item,
					...state.items.slice(weaponId)
				]
			}
    case 'GAINED_LIFE_FROM_ITEM':
      const itemIndex = state.items.findIndex(item => item.id === Number(action.item.id));

      const updatedPlayer = {...state.player,
        hp: action.playerHp,
        row: action.item.row, col: action.item.col};

      return {
        ...state,
        player: updatedPlayer,
        items: [
          ...state.items.slice(0, itemIndex),
          action.item,
          ...state.items.slice(itemIndex)
        ]
      }
    default:
      return state;
  }
}

export default gameReducer;

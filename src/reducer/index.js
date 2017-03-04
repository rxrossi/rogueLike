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
        player: {...state.player, hp: action.playerHp},
        enemies: [...state.enemies.slice(0, enemyIndex),
                  action.enemy,
                  ...state.enemies.slice(enemyIndex+1)]

      }
    case 'GAINED_LIFE_FROM_ITEM':
      console.log("interacting with item", action)
      const itemIndex = state.enemies.findIndex(item => item.id === Number(action.item.id));

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

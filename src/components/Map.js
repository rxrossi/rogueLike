import React from 'react';
import { connect } from 'react-redux';
import { movePlayer, fight, gainLifeFromItem } from '../actions';

class MapComponent extends React.Component {

	componentWillReceiveProps() {
		const { map, player, enemies, items } = this.props;
		map[player.row][player.col] = "floor";
		enemies.forEach( enemy => map[enemy.row][enemy.col] = "floor")
		items.forEach( item => map[item.row][item.col] = "floor")
	}

	componentDidMount() {
		window.addEventListener("keydown", (e) => {
			// console.log(e.keyCode);
			switch (e.keyCode) {
				case 37:
					this.playerMove("LEFT")
					break;
				case 38:
					this.playerMove("TOP")
					break;
				case 39:
					this.playerMove("RIGHT")
					break;
				case 40:
					this.playerMove("BOTTOM")
					break;

				default:
					break;
			}
		})
	}

	playerMove(input) {
		const { map, enemies, player, items } = this.props;
		const { movePlayer, fight, gainLifeFromItem } = this.props;

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

		function interatWithEnemy(enemyId) {
			let enemy = enemies.find(enemy => enemy.id === Number(enemyId));
			enemy.hp -= player.attack;
			const playerHp = player.hp - enemy.attack;
			return {updatedEnemy: enemy, updatedPlayerHp: playerHp}
		}

		function interactWithItem(itemId) {
			let item = items.find(item => item.id === Number(itemId));

			switch (item.type) {
				case 'health':
					const playerHp = player.hp + item.value;
					item.onMap = false;
					return {updatedItem: item, updatedPlayerHp: playerHp }
				case 'weapon':
					const playerAttack = item.attack;
					item.onMap = false;
					return {updatedItem: item, updatedPlayerAttack: playerAttack }
				default:
					console.log("unknown item type: ", item.type)
					break;
			}
		}

		switch(destination.type){
			case 'floor':
					movePlayer(destination.coords);
				break;
			case 'enemy':
					const dataOfFight = interatWithEnemy(destination.entityId);
					fight(dataOfFight)
				break;
			case 'health':
				player.hp < 1000 //TODO: if the user life is 975, takink a pot will increase life above 1000
				?	gainLifeFromItem(interactWithItem(destination.entityId))
				: movePlayer(destination.coords);
				break;
			case 'wall':
				break;
			default:
				console.log("Something blocking the way, unkown entity type: ", destination.type, destination.entityID);
				break;
		}
	}


	render() {
		const { player, map } = this.props;
		const { enemies, items } = this.props;

		enemies.forEach( enemy => enemy.hp > 0 ? map[enemy.row][enemy.col] = "enemy "+enemy.id : '' );
		items.forEach( item => item.onMap ? map[item.row][item.col] = item.type+" "+item.id : '');

		map[player.row][player.col] = "player";
		return (
			<div>
				<div> Player row: {player.row}, Player col: {player.col} </div>
				<div> Player HP: {player.hp}</div>
				{
					map.map( (row, rowKey) => {
						return (
							<div key={rowKey} className="row">
								{
									row.map( (cell, cellKey) => {
										return (
											<div className={cell} key={rowKey+''+cellKey}>
												{rowKey} {cellKey}
											</div>
										)
									})
								}
							</div>
						)
					})
				}
			</div>
		)
	}

} //MapComponent
const mapStateToProps = (state) => ({
  map: state.map,
  player: state.player,
  enemies: state.enemies,
  items: state.items
})
const mapDispatchToProps = (dispatch) => ({
	movePlayer: (destination) => dispatch(movePlayer(destination)),
	fight: (dataOfFight) => dispatch(fight(dataOfFight)),
	gainLifeFromItem: (item) => dispatch(gainLifeFromItem(item))
}) //

MapComponent = connect(mapStateToProps, mapDispatchToProps)(MapComponent)

export default MapComponent;


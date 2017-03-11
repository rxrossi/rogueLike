import React from 'react';
import { connect } from 'react-redux';
import { movePlayer, fight, gainLifeFromItem, equipWeapon, gainExp, gainLvl, nextMapLvl, toggleDarkness } from '../actions';
import _ from 'lodash';

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
		const { movePlayer, fight, gainLifeFromItem, equipWeapon, gainExp, gainLvl, nextMapLvl } = this.props;

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
			let enemy = enemies.find(enemy => enemy.id === enemyId);
			let updatedEnemyHp = enemy.hp - player.attack;
			const updatedPlayer = {...player, hp: player.hp - enemy.attack }
			if (enemyId === 'boss' && updatedEnemyHp <= 0) console.log('you win');
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

		switch(destination.type){
			case 'floor':
					movePlayer(destination.coords);
				break;
			case 'enemy':
					const dataOfFight = interatWithEnemy(destination.entityId);
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
	}
	playerMove = _.throttle(this.playerMove, 50);

	render() {
		const { player, map, darkness, toggleDarkness } = this.props;
		const { enemies, items } = this.props;

		enemies.forEach( enemy => enemy.hp > 0 ? map[enemy.row][enemy.col] = "enemy "+enemy.id+' '+enemy.hp/enemy.maxHp *100 : '' );
		items.forEach( item => item.onMap ? map[item.row][item.col] = item.type+" "+item.id : '');

		map[player.row][player.col] = "player";

		let viewport = map;

		let viewDistance = 15;

		if (darkness) {
			viewport = viewport.map(
				(row, rowKey) => row.map(
					(cell, cellKey) => {
						return (
							(cellKey < player.col +7) &&
							(cellKey > player.col -7) &&
							(rowKey  < player.row +7) &&
							(rowKey  > player.row -7)
							? cell : cell="darkness"
						)
					}
				)
			)
		}

		const mapRowLenght = map.length;
		const mapColLenght = map[0].length

		const lowerRowFilter = Math.min(player.row - viewDistance, mapRowLenght - viewDistance*2)
		const higherRowFilter = Math.max (player.row + viewDistance, viewDistance*2) ;
		//higher = player.row + viewdistance
		const lowerColFilter = Math.min(player.col - viewDistance, mapColLenght - viewDistance*2)
		const higherColFilter =	Math.max(player.col + viewDistance, viewDistance*2)

		viewport = viewport.filter( (row, rowKey) =>
								rowKey > lowerRowFilter && rowKey < higherRowFilter
		)
		viewport = viewport.map(
			row => row.filter( (cell, cellKey) =>
				cellKey > lowerColFilter && cellKey < higherColFilter
			)
		)
		const playerHpPercentage = Math.floor( player.hp / player.maxHp * 100 )+'%';

		return (
			<div className="wholeScreen">
				<div> Player row: {player.row}, Player col: {player.col} </div>
				<div> PlayerHealth
					<div className="bar" style={{ width: '100px' }}>
						<div className='fill'
								data-text={`${player.hp}/${player.maxHp}`}
								style={{ width: playerHpPercentage  }} >
						</div>
					</div>
				</div>
				<div> Weapon: {player.weapon} </div>
				<div> Attack: {player.attack} </div>
				<div> lvl: {player.lvl} </div>
				<div> exp: {player.exp}/{player.maxExp} </div>
				<div> <button onClick={toggleDarkness}> Darkness {darkness ? 'ON' : 'OFF'}  </button> </div>
				<div className="viewport">
					{
						viewport.map( (row, rowKey) => {
							return (
								<div key={rowKey} className="row">
									{
										row.map( (cell, cellKey) => {
											//add health bars
											const entityType = cell.split(" ")[0];
											let healthBarDiv;
											if (entityType === "enemy" || entityType === "player") {
												let healthPercentage;
												let hpBarFill;
												if (entityType === "enemy") {
													healthPercentage = cell.split(" ")[2]+'%';
													hpBarFill = "redFill";
												} else {
													healthPercentage = playerHpPercentage;
													hpBarFill = "greenFill"
												}	
											  healthBarDiv = 	<div className="onMapHpBar">
																			 		<div className={hpBarFill} style={{ width: healthPercentage }}></div>
																				</div>;
											}	
											return (
												<div className={cell} key={rowKey+''+cellKey} >
													{ healthBarDiv || '' }	
												</div>
											)
										})
									}
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}

} //MapComponent
const mapStateToProps = (state) => ({
  map: state.map,
  player: state.player,
  enemies: state.enemies,
  items: state.items,
	darkness: state.darkness
})
const mapDispatchToProps = (dispatch) => ({
	movePlayer: (destination) => dispatch(movePlayer(destination)),
	fight: (dataOfFight) => dispatch(fight(dataOfFight)),
	gainLifeFromItem: (item) => dispatch(gainLifeFromItem(item)),
	equipWeapon: (data) => dispatch(equipWeapon(data)),
	gainExp: (data) => dispatch(gainExp(data)),
	gainLvl: () => dispatch(gainLvl()),
	nextMapLvl: () => dispatch(nextMapLvl()),
	toggleDarkness: () => dispatch(toggleDarkness())
})

MapComponent = connect(mapStateToProps, mapDispatchToProps)(MapComponent)

export default MapComponent;


import React from 'react';
import { connect } from 'react-redux';
import { movePlayer, fight, gainLifeFromItem, equipWeapon, gainExp, gainLvl, nextMapLvl, toggleDarkness, sendNotification, playerDead } from '../../actions';
import Dialog from '../Dialog.js';
import Viewport from '../../components/Viewport';
import handleInput from './handleInput';
import _ from 'lodash';

class Game extends React.Component {

	componentWillReceiveProps() {
		const { map, player, enemies, items } = this.props;
		map[player.row][player.col] = "floor";
		enemies.forEach( enemy => map[enemy.row][enemy.col] = "floor")
		items.forEach( item => map[item.row][item.col] = "floor")
	}

	componentDidMount() {
		window.addEventListener("keydown", (e) => {
			if (this.props.player.hp <= 0) return;
			switch (e.keyCode) {
				case 37:
					this.handleInput("LEFT")
					break;
				case 38:
					this.handleInput("TOP")
					break;
				case 39:
					this.handleInput("RIGHT")
					break;
				case 40:
					this.handleInput("BOTTOM")
					break;

				default:
					break;
			}
		})
	}

	//handleInput = _.throttle(handleInput, 50);
	handleInput(input) {
		handleInput({input, ...this.props})
	}

	render() {
		const { player, map, darkness, toggleDarkness,
						enemies, items, msg } = this.props;

		enemies.forEach( enemy =>
			enemy.hp > 0 ?
				map[enemy.row][enemy.col] = "enemy "+enemy.id+' '+enemy.hp/enemy.maxHp *100 :
				''
		);

		items.forEach( item =>
			item.onMap ? map[item.row][item.col] = item.type+" "+item.id : ''
		);

		map[player.row][player.col] = "player";

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

				<Viewport playerHpPercentage={playerHpPercentage}	{...this.props}/>

				<Dialog msg={msg} />
			</div>
		)
	}

}

//MapComponent
const mapStateToProps = (state) => ({
  map: state.map,
  player: state.player,
  enemies: state.enemies,
  items: state.items,
	darkness: state.darkness,
	msg: state.msg
})
const mapDispatchToProps = (dispatch) => ({
	movePlayer: (destination) => dispatch(movePlayer(destination)),
	fight: (dataOfFight) => dispatch(fight(dataOfFight)),
	gainLifeFromItem: (item) => dispatch(gainLifeFromItem(item)),
	equipWeapon: (data) => dispatch(equipWeapon(data)),
	gainExp: (data) => dispatch(gainExp(data)),
	gainLvl: () => dispatch(gainLvl()),
	nextMapLvl: () => dispatch(nextMapLvl()),
	toggleDarkness: () => dispatch(toggleDarkness()),
	sendNotification: (msg) => dispatch(sendNotification(msg)),
	playerDead: () => dispatch(playerDead()),
})

Game = connect(mapStateToProps, mapDispatchToProps)(Game)

export default Game;


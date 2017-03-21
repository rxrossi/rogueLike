import React from 'react';
import { connect } from 'react-redux';
import './dialog.css';
import { clearNotification } from '../actions';

class Dialog extends React.Component {
	render () {
		const { msg, clearNotification } = this.props;
		return (
			<div className={ msg ? "dialog" : "hidden" }>
				<p>{msg}</p>
				<button onClick={clearNotification}> Ok </button>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	msg: state.msg
});

export default connect(mapStateToProps, {clearNotification})(Dialog);

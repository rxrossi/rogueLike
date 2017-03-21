import React from 'react';
import { connect } from 'react-redux';
import './dialog.css';

class Dialog extends React.Component {
	render () {
		const { sendAction } = this.props;
		const { msg, buttons } = this.props.dialogData;
		return (
			<div className={ msg ? "dialog" : "hidden" }>
				<p>{msg}</p>

				{
					( buttons|| [] ).map( (buttonData, btnKey) =>
						<button key={btnKey} onClick={() => sendAction(buttonData.action())}>
							{buttonData.label}
						</button>
					)
				}

			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	dialogData: state.dialogData
});

const mapDispatchToProps = (dispatch) => ({
	sendAction: (fn) => dispatch(fn)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);

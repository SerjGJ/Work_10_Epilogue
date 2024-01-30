import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InformationLayout } from './InformationLayout';

class Information extends Component {
	render() {
		const { currentPlayer, isGameEnded, isDraw } = this.props;
		let status = '';

		if (isDraw) {
			status = 'Ничья';
		} else if (isGameEnded) {
			status = `Победа: ${currentPlayer}`;
		} else {
			status = `Ходит: ${currentPlayer}`;
		}

		return (
			<InformationLayout>
				<div className="information">{status}</div>
			</InformationLayout>
		);
	}
}

Information.propTypes = {
	currentPlayer: PropTypes.string,
	isGameEnded: PropTypes.bool,
	isDraw: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	currentPlayer: state.currentPlayer,
	isGameEnded: state.isGameEnded,
	isDraw: state.isDraw,
});

const ConnectedInformation = connect(mapStateToProps)(Information);
export { ConnectedInformation };

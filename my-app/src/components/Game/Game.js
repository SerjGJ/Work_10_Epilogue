import { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentPlayer, setGameEnded, setDraw, setField } from '../../action';
import { ConnectedInformation } from './Information';
import { ConnectedField } from './Field';
import { GameLayout } from './GameLayout';

const WIN_PATTERNS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

class Game extends Component {
	constructor(props) {
		super(props);
		this.handleCellClick = this.handleCellClick.bind(this);
		this.handleRestart = this.handleRestart.bind(this);
	}

	handleCellClick(index) {
		const { field, currentPlayer, isGameEnded, dispatch } = this.props;

		if (!field[index] && !isGameEnded) {
			const newField = [...field];
			newField[index] = currentPlayer;

			dispatch(setField(newField));

			if (this.checkWinner(newField, currentPlayer)) {
				dispatch(setGameEnded(true));
			} else if (newField.every((cell) => cell !== '')) {
				dispatch(setDraw(true));
				dispatch(setGameEnded(true));
			} else {
				dispatch(setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'));
			}
		}
	}

	handleRestart() {
		const { dispatch } = this.props;

		const resetState = {
			currentPlayer: 'X',
			isGameEnded: false,
			isDraw: false,
			field: Array(9).fill(''),
		};

		dispatch(setCurrentPlayer(resetState.currentPlayer));
		dispatch(setGameEnded(resetState.isGameEnded));
		dispatch(setDraw(resetState.isDraw));
		dispatch(setField(resetState.field));
	}

	checkWinner(currentField, player) {
		return WIN_PATTERNS.some((pattern) => pattern.every((index) => currentField[index] === player));
	}

	render() {
		const { currentPlayer, isGameEnded, isDraw } = this.props;

		return (
			<GameLayout>
				<ConnectedInformation currentPlayer={currentPlayer} isGameEnded={isGameEnded} isDraw={isDraw} />
				<ConnectedField winPatterns={WIN_PATTERNS} onCellClick={this.handleCellClick} />
				<div className="restartButton">
					<button onClick={this.handleRestart}>Начать заново</button>
				</div>
			</GameLayout>
		);
	}
}

const mapStateToProps = (state) => ({
	currentPlayer: state.currentPlayer,
	isGameEnded: state.isGameEnded,
	isDraw: state.isDraw,
	field: state.field,
});

const ConnectedGame = connect(mapStateToProps)(Game);
export { ConnectedGame };

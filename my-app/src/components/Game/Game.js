import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPlayer, setGameEnded, setDraw, setField } from '../../action';
import { Information } from './Information';
import { Field } from './Field';
import { GameLayout } from './GameLayout';
import styles from '../../App.module.css';

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

const selectField = (state) => state.field;
const selectCurrentPlayer = (state) => state.currentPlayer;
const selectIsGameEnded = (state) => state.isGameEnded;
const selectIsDraw = (state) => state.isDraw;

export const Game = () => {
	const dispatch = useDispatch();

	const field = useSelector(selectField);
	const currentPlayer = useSelector(selectCurrentPlayer);
	const isGameEnded = useSelector(selectIsGameEnded);
	const isDraw = useSelector(selectIsDraw);

	const handleCellClick = (index) => {
		if (!field[index] && !isGameEnded) {
			const newField = [...field];
			newField[index] = currentPlayer;

			dispatch(setField(newField));

			if (checkWinner(newField, currentPlayer)) {
				dispatch(setGameEnded(true));
			} else if (newField.every((cell) => cell !== '')) {
				dispatch(setDraw(true));
				dispatch(setGameEnded(true));
			} else {
				dispatch(setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'));
			}
		}
	};

	const handleRestart = () => {
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
	};

	const checkWinner = (currentField, player) => {
		return WIN_PATTERNS.some((pattern) => pattern.every((index) => currentField[index] === player));
	};

	return (
		<GameLayout>
			<Information currentPlayer={currentPlayer} isGameEnded={isGameEnded} isDraw={isDraw} />
			<Field field={field} onCellClick={handleCellClick} />
			<div className={styles.restartButton}>
				<button onClick={handleRestart}>Начать заново</button>
			</div>
		</GameLayout>
	);
};

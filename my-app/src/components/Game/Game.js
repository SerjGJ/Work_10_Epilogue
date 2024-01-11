import React from 'react';
import { useEffect, useState } from 'react';
import { store } from '../../store';
import { setCurrentPlayer, setGameEnded, setDraw, setField } from '../../action';
import { subscribe } from '../../store';
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

export const Game = () => {
	const [localState, setLocalState] = useState(store.getState());

	useEffect(() => {
		const handleStateChange = () => setLocalState(store.getState());
		subscribe(handleStateChange);

		return () => subscribe(handleStateChange);
	}, []);

	const handleCellClick = (index) => {
		const { field, currentPlayer, isGameEnded } = localState;

		if (!field[index] && !isGameEnded) {
			const newField = [...field];
			newField[index] = currentPlayer;

			store.dispatch(setField(newField));

			if (checkWinner(newField, currentPlayer)) {
				store.dispatch(setGameEnded(true));
			} else if (newField.every((cell) => cell !== '')) {
				store.dispatch(setDraw(true));
				store.dispatch(setGameEnded(true));
			} else {
				store.dispatch(setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'));
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

		store.dispatch(setCurrentPlayer(resetState.currentPlayer));
		store.dispatch(setGameEnded(resetState.isGameEnded));
		store.dispatch(setDraw(resetState.isDraw));
		store.dispatch(setField(resetState.field));
	};

	const checkWinner = (currentField, player) => {
		return WIN_PATTERNS.some((pattern) => pattern.every((index) => currentField[index] === player));
	};

	return (
		<GameLayout>
			<Information currentPlayer={localState.currentPlayer} isGameEnded={localState.isGameEnded} isDraw={localState.isDraw} />
			<Field field={localState.field} onCellClick={handleCellClick} />
			<div className={styles.restartButton}>
				<button onClick={handleRestart}>Начать заново</button>
			</div>
		</GameLayout>
	);
};

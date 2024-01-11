import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InformationLayout } from './InformationLayout';
import styles from '../../App.module.css';

export const Information = ({ currentPlayer, isGameEnded, isDraw }) => {
	const [status, setStatus] = useState('');

	useEffect(() => {
		if (isDraw) {
			setStatus('Ничья');
		} else if (isGameEnded) {
			setStatus(`Победа: ${currentPlayer}`);
		} else {
			setStatus(`Ходит: ${currentPlayer}`);
		}
	}, [isDraw, isGameEnded, currentPlayer]);

	return (
		<InformationLayout>
			<div className={styles.information}>{status}</div>
		</InformationLayout>
	);
};

Information.propTypes = {
	currentPlayer: PropTypes.string,
	isGameEnded: PropTypes.bool,
	isDraw: PropTypes.bool,
};

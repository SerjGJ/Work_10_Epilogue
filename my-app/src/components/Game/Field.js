import React from 'react';
import PropTypes from 'prop-types';
import { FieldLayout } from './FieldLayout';
import styles from '../../App.module.css';

export const Field = ({ field, onCellClick }) => {
	return (
		<FieldLayout>
			<div className={styles['field-wrapper']}>
				<div className={styles.field}>
					{field.map((cell, index) => (
						<button key={index} onClick={() => onCellClick(index)}>
							{cell}
						</button>
					))}
				</div>
			</div>
		</FieldLayout>
	);
};

Field.propTypes = {
	field: PropTypes.arrayOf(PropTypes.string),
	onCellClick: PropTypes.func,
};

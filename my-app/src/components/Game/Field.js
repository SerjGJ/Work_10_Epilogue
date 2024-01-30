import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FieldLayout } from './FieldLayout';

class Field extends Component {
	render() {
		const { field, onCellClick } = this.props;

		return (
			<FieldLayout>
				<div className="field-wrapper">
					<div className="field">
						{field.map((cell, index) => (
							<button key={index} onClick={() => onCellClick(index)}>
								{cell}
							</button>
						))}
					</div>
				</div>
			</FieldLayout>
		);
	}
}

Field.propTypes = {
	field: PropTypes.arrayOf(PropTypes.string),
	onCellClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
	field: state.field,
	isGameEnded: state.isGameEnded,
	currentPlayer: state.currentPlayer,
});

const ConnectedField = connect(mapStateToProps)(Field);
export { ConnectedField };

import { Component } from 'react';
import PropTypes from 'prop-types';

export class GameLayout extends Component {
	render() {
		const { children } = this.props;
		return <div className="game-layout">{children}</div>;
	}
}

GameLayout.propTypes = {
	children: PropTypes.node,
};

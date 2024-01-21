import PropTypes from 'prop-types';

export const GameLayout = ({ children }) => {
	return <div className="game-layout">{children}</div>;
};

GameLayout.propTypes = {
	children: PropTypes.node,
};

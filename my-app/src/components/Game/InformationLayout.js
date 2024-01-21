import PropTypes from 'prop-types';

export const InformationLayout = ({ children }) => {
	return <div className="information-layout">{children}</div>;
};

InformationLayout.propTypes = {
	children: PropTypes.node,
};

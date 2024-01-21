import PropTypes from 'prop-types';

export const FieldLayout = ({ children }) => {
	return <div className="field-layout">{children}</div>;
};

FieldLayout.propTypes = {
	children: PropTypes.node,
};

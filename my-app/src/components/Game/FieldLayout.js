import { Component } from 'react';
import PropTypes from 'prop-types';

export class FieldLayout extends Component {
	render() {
		const { children } = this.props;
		return <div className="field-layout">{children}</div>;
	}
}

FieldLayout.propTypes = {
	children: PropTypes.node,
};

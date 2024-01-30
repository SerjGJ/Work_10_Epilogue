import { Component } from 'react';
import PropTypes from 'prop-types';

export class InformationLayout extends Component {
	render() {
		const { children } = this.props;
		return <div className="information-layout">{children}</div>;
	}
}

InformationLayout.propTypes = {
	children: PropTypes.node,
};

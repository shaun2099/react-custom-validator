import React from 'react';
import PropTypes from 'prop-types';
export { ValidationSummary, Required, Email, MinLength, MaxLength, Number, True, SameAs } from './ValidationSummary';

export class ValidationMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { valid: true, errorMessage: "" };
		if (this.props.vs)
			this.props.vs.register(this);
	}

	componentWillUnmount() {
		if (this.props.vs)
			this.props.vs.unregister(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.sync === true && prevProps.data !== this.props.data)
			this.isValid();
	}

	isFunction = (obj) => {
		return !!(obj && obj.constructor && obj.call && obj.apply);
	}

	isValid = () => {
		if (!this.props.validators || this.props.validators.lengh === 0)
			return true;

		let value = this.props.data;
		let valid = true;
		for (let i = 0; i < this.props.validators.length; i++) {

			let validatorRef = this.props.validators[i];
			let validator = null;
			if (this.isFunction(validatorRef))
				validator = validatorRef.call();
			else
				validator = validatorRef;
			valid = validator.validate(value);
			if (!valid) {
				this.state.errorMessage = validator.errMessage(this.props.res);
				this.updateElement(false);
				break;
			} else {
				this.state.errorMessage = "";
				this.updateElement(true);
			}
		}
		this.setState({ valid: valid });
		return valid;
	}

	updateElement = (valid) => {
		if (this.props.tag) {
			var elem = null;
			if (this.props.tag.indexOf('#') === 0) {
				let id = this.props.tag.substring(1, this.props.tag.length);
				elem = document.getElementById(id);
			} else {
				let controls = document.getElementsByName(this.props.tag);
				if (controls && controls.length > 0)
					elem = controls[0];
			}

			if (elem) {
				let errStyle = this.props.eleStyle ? this.props.eleStyle : "is-invalid";
				if (valid && elem.className.indexOf(errStyle) > -1) {
					elem.className = elem.className.replace(errStyle, "").trim();
				}
				else if (!valid && elem.className.indexOf(errStyle) < 0) {
					elem.className = elem.className.trim() + " " + errStyle;
				}
			}
		}
	}

	render() {
		if (this.state.valid)
			return null;
		else {
			return (<span className={this.props.errStyle}>{this.state.errorMessage}</span>);
		}
	}
}

ValidationMessage.propTypes = {
	vs: PropTypes.object.isRequired,
};

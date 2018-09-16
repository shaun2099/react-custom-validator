import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ValidationMessage extends Component {
	constructor(props) {
		super(props);
		this.state = { valid: true, errorMessage: "" };
		if (this.props.vs)
			this.props.vs.register(this);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
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


export const ValidationSummary = function () {
	var validatoions = [];
	var messages = [];
	return {
		register: (validation) => {
			validatoions.push(validation);
		},
		isValid: () => {
			messages = [];
			for (let index = 0; index < validatoions.length; index++) {
				let validation = validatoions[index];
				validation.isValid();
				if (validation.state.errorMessage) {
					messages.push(validation.state.errorMessage);
				}
			}
			return messages.length === 0;
		},
		getMessages: () => (messages)
	}
}

export const Required = (message) => ({
	validate: (value) => {
		if (value === 0)
			return true;
		if (typeof value === "string") {
			return !!value.trim();
		}
		else {
			return !!value;
		}
	},
	errMessage: (res) => {
		return message ? message : "This field is required";
	}
});


export const Email = (message) => ({
	validate: (value) => {
		if (!value)
			return false;
		if (typeof value === "string") {
			var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return regex.test(String(value).toLowerCase());
		}
		else
			return false;
	},
	errMessage: () => {
		return message ? message : "Email format invalid";
	}
});

export const MinLength = (length, message) => ({
	validate: (value) => {
		if (length < 1)
			length = 1;
		if (!value)
			return false;
		return String(value).length >= length
	},
	errMessage: () => {
		if (length < 1)
			length = 1;
		return message ? message : "Minimum length " + length;
	},
});

export const MaxLength = (length, message) => ({
	validate: (value) => {
		if (length < 1)
			length = 1;
		if (!value)
			return true;
		return String(value).length <= length
	},
	errMessage: () => {
		if (length < 1)
			length = 1;
		return message ? message : "Maximum length " + length;
	}
});

export const OnlyNumber = (message) => ({
	validate: (value) => {
		if (!value)
			return true;

		var regex = /^\d+$/;
		return regex.test(value);
	},
	errMessage: () => {
		return message ? message : "Only numbers are allowed";
	}
});


export const True = (message) => ({
	validate: (value) => {
		return value === true;
	},
	errMessage: () => {
		return message ? message : "Please check";
	}
});

export const SameAs = (compareTo, message) => ({
	validate: (value) => {
		return value === compareTo;
	},
	errMessage: () => {
		return message ? message : "Not same as ";
	}
});
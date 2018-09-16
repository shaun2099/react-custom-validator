import React from "react";
import { ValidationMessage, ValidationSummary, Required } from "../lib/CustomValidator";

export class RequiredText extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "", errorMessages: [] }
		this.vs = ValidationSummary();
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value, errorMessages: [] });
	}

	validate = () => {
		let valid = this.vs.isValid();
		this.setState({ errorMessages: this.vs.getMessages() });
	}

	render() {
		var errors = this.state.errorMessages.map(m => <span>{m}</span>)
		return (
			<div>
				<input type="text" name="username" onChange={this.onChange} />
				<br />
				<ValidationMessage validators={[Required]} data={this.state.username} tag="username" vs={this.vs} sync={true} errStyle="text-danger" eleStyle="invalid" />
				<br />
				<button type="button" onClick={this.validate}>Submit</button>
				<span>{errors}</span>
			</div>)
	}
}
## React Custom Validator

- [Github https://github.com/shaun2099/react-custom-validator](https://github.com/shaun2099/react-custom-validator)
- No wrapped react-dom components required, validate on state other than input, fully customized validator.
- You can use some default validators e.g. `Requied`, `Email`, `MinLength`, `MaxLength`, `Number`, `True`, `SameAs`.
- You can create your own validators as you like.


## Step 1  Import component and initialize a validation summary in constructor
```js
import { ValidationMessage, ValidationSummary, Required, Email, MinLength, MaxLength, Number, True, SameAs } from "react-custom-validator";

constructor(props) {
		this.vs = ValidationSummary();
	}

```

## Step 2  Use ValidationMessage after html input or wherever you like

``` jsx
<input type="text" name="username" onChange={this.onChange} />
<ValidationMessage validators={[Required]} data={this.state.username} vs={this.vs} sync={true} tag="username" errStyle="text-danger" eleStyle="invalid" />
<button type="button" onClick={this.validate}>Submit</button>
```
* `validators` a list of validators predefined, you can have multiple [Required, Email, MinLength(20)], you can pass error message [Email("invalid email format"), MaxLength(10, "Max length is 10")]
* `data` the value you want to validate, this should be a state.value, not tested with this.props.value.
* `vs` the validation summary it hooks on, so set it to this.vs.
* `sync` optional, set to true if you want to do validation while typing; set to false or remove this attribute if you only want to validate this field when submit forml
* `tag` optional, the html element name or id tag="#id". If this field is set you can then update your control's style when validation fails.
* `errStyle` optional, the style of ValidationMessage, usually it is a red color style 
* `eleStyle` optional, the style of html element when validation fails, usually it is a red border style 


## Step 3  Handle validation summary

``` js
	validate = () => {
    let valid = this.vs.isValid();
    if (!vallid)
      this.setState({ errorMessages: this.vs.getMessages() });
    else
      console.log("Validation succeed");
	}
```

Handle your final check during form submission.

`this.vs.getMessages()` returns a array of messages for all errors, returns [] if no error.

You are all set until now.
If you want create your own validator:
## Customized validator

Create your own validator by just creating and exporting a function like below, and use it together with other validators

``` js
export const OnlyLetter = (message) => ({
	validate: (value) => {
    if (!value) return true;
		return /^[a-zA-Z]*$/.test(value);
	},
	errMessage: () => {
		return message ? message : "Only letters are allowed";
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
```


export const ValidationSummary = function () {
	var validatoions = [];
	var messages = [];
	return {
		register: (validation) => {
			validatoions.push(validation);
		},
		unregister: (validation) => {
			let index = validatoions.indexOf(validation);
			if (index > -1)
				validatoions.splice(index, 1);
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
		if (String(value) === "0")
			return true;
		if (typeof value === "string") {
			return !!(value.trim());
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
		if (!value && String(value) !== "0")
			return true;
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

export const Number = (message) => ({
	validate: (value) => {
		if (String(value) === "0")
			return true;
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
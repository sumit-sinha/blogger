import { Injectable } from "@angular/core";
import { ValidationType } from "./ValidationType";

@Injectable()
export class ValidationHelper {

	/**
	 * perform a full validation on form and return the status
	 * @param fields {Array}
	 * @return {Object}
	 */
	validateForm(fields: Array): Object {

		if (fields == null || fields.length === 0) {
			return {valid: true};
		}

		let status = {messages: [], valid: true};
		for (let i = 0, length = fields.length; i < length; i++) {
			let field = fields[i];
			if (field.input == null) {
				status.valid = false;
				break;
			}

			if (field.input.invalid === false) {
				 status.valid = true;
				 status.messages.push(field.input.message);
				 break;
			}

			let fieldStatus = this.validateComponent(field.input);
			if (fieldStatus.valid === false) {
				status.valid = false;
				field.input.invalid = true;
				field.input.message = fieldStatus.message;
				status.messages.push(fieldStatus.message);
			}
		}

		return status;
	}

	/**
	 * perform validation and return an Object with status
	 * @param input {Object}
	 * @return {Object}
	 */
	validateComponent(input: Object): Object {
		
		if (input == null || input.validations == null) {
			return {valid: true};
		}

		let status = {};
		let validations = input.validations;
		for (let i = 0, length = validations.length; i < length; i++) {
			let validation = validations[i];
			switch(validation.type) {
				case ValidationType.MANDATORY:
					status.valid = input.value != null && input.value.trim() !== "";
					break;
				case ValidationType.EMAIL:
					let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					status.valid = emailRegex.test(input.value);
					break;
				case ValidationType.NUMBER:
					status.valid = isNaN(input.value) === false && typeof(input.value) !== "string";
					break;
				case ValidationType.PHONE_NUMBER:
					let phoneRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
					status.valid = phoneRegex.test(input.value);
					break;
				case ValidationType.REGEX:
					status.valid = false;
					for (let j = 0, regexLength = validation.listRegex.length; j < regexLength; j++) {
						let regex = validation.listRegex[j];
						if (regex.test(input.value)) {
							status.valid = true;
							break;
						}
					}

					break;
			}

			if (status.valid === false) {
				input.invalid = true;
				break;
			}
		}

		return status;
	}
}
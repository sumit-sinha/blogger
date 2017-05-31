import { Injectable } from '@angular/core';
import { ValidationType } from './ValidationType';

@Injectable()
export class ValidationHelper {

  /**
   * perform a full validation on form and return the status
   * @param fields {Array}
   * @return {Object}
   */
  validateForm(fields: any): any {

    if (fields == null || fields.length === 0) {
      return {
        valid: true
      };
    }

    const status = {
      messages: [],
      valid: true
    };

    const length = fields.length;
    for (let i = 0; i < length; i++) {
      const field = fields[i];
      if (field.input == null) {
        status.valid = false;
        break;
      }

      if (field.input.invalid) {
        status.valid = false;
        status.messages.push(field.input.message);
        break;
      }

      const fieldStatus = this.validateComponent(field.input);
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
  validateComponent(input: any): any {

    if (input == null || input.validations == null) {
      return {
        valid: true
      };
    }

    const status: any = {};
    const validations = input.validations;
    const length = validations.length;
    for (let i = 0; i < length; i++) {
      const validation = validations[i];
      switch (validation.type) {
        case ValidationType.MANDATORY:
          status.valid = input.value != null && input.value.trim() !== '';
          break;
        case ValidationType.EMAIL:
          const emailRegex = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          status.valid = emailRegex.test(input.value);
          break;
        case ValidationType.NUMBER:
          status.valid = isNaN(input.value) === false && typeof(input.value) !== 'string';
          break;
        case ValidationType.PHONE_NUMBER:
          const phoneRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
          status.valid = phoneRegex.test(input.value);
          break;
        case ValidationType.REGEX:
          status.valid = false;
          const regexLength = validation.listRegex.length;
          for (let j = 0; j < regexLength; j++) {
            const regex = validation.listRegex[j];
            if (regex.test(input.value)) {
              status.valid = true;
              break;
            }
          }

          break;
      }

      if (status.valid === false) {
        status.message = validation.message;
        break;
      }
    }

    return status;
  }
}

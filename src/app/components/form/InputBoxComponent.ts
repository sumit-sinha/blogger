import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ValidationHelper } from '../../helpers/validation/ValidationHelper';

@Component({
  selector: 'input-box',
  template: `
		<label for="{{ data.input.id }}" class="sr-only">{{ data.label.text }}</label>
		<input type="{{ data.input.type }}"
			id="{{ data.input.id }}"
			class="form-control {{ data.input.class }}"
			placeholder="{{ data.input.placeholder }}"
			(blur)="onInputBlur($event)"
			value="{{ data.input.value }}"
			(keyup)="onInputChange($event)"
			[ngClass]="{'error': data.input.invalid}"
			[attr.autofocus]="data.input.autoFocus" >
	`,
  styles: [`.error{background: #f7e0e0;}`]
})

export class InputBoxComponent {

  @Input()
  data: any;

  constructor(private validator: ValidationHelper) {}

  onInputBlur($event) {

    const input = this.data.input;
    if (input) {
      input.value = $event.target.value;
    }

    const status = this.validator.validateComponent(input);
    if (status.valid === false) {
      input.invalid = true;
      input.message = status.message;
    }
  }

  onInputChange($event) {
    const input = this.data.input;
    if (input) {
      input.value = $event.target.value;
    }

    const status = this.validator.validateComponent(input);
    if (status.valid) {
      input.invalid = false;
      input.message = null;
    }
  }
}

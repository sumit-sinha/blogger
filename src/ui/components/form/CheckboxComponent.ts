import { Component, Input } from "@angular/core";
import { ValidationHelper } from "../../helpers/validation/ValidationHelper";

@Component({
	selector: "check-box",
	template: `
		<div class="checkbox">
			<label><input 
				type="checkbox" 
				[attr.checked]="data.input.value" 
				(change)="onCheckboxClick($event)"> {{ data.label.text }}</label>
		</div>
	`,
	styles: [``]
})

export class CheckboxComponent {

	@Input()
	data: Object;

	onCheckboxClick($event) {
		if (this.data.input == null) {
			this.data.input = {};
		}

		this.data.input.value = $event.target.checked;
	}
}
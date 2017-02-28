import { Component, Input } from "@angular/core";

@Component({
	selector: "loading-button",
	template: `
		<button type="{{ data.type }}" 
			[attr.class]="data.cssClass" 
			[ngClass]="{'disabled': data.loading}" 
			[attr.id]="data.id" 
			(click)="onButtonClick($event)">
			<span *ngIf="data.loading === false">{{ data.text }}</span>
			<span *ngIf="data.loading === true">
				<i class='fa fa-circle-o-notch fa-spin'></i> {{ data.loadingText }}
			</span>
		</button>
	`
})

export class LoadingButtonComponent {

	@Input()
	data: Object;

	/**
	 * function called when user clicks on button
	 * @param $event {Object}
	 */
	onButtonClick($event) {
		if (this.data.callback && typeof this.data.callback.fn === "function") {
			this.data.callback.fn($event, this.data.callback.args);
		}
	}
}
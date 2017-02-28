import { Component, Input } from "@angular/core";

@Component({
	selector: "alert-message",
	template: `
		<div class="alert alert-{{ message.type }}" role="alert" *ngIf="message.show">
			<span *ngIf="message.title == null" [innerHTML]="message.text"></span>
		</div>
	`
})

export class AlertMessageComponent {

	@Input()
	message: Object;

}
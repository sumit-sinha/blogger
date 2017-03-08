import { Component, Input } from "@angular/core";

@Component({
	selector: "alert-message",
	template: `
		<div class="alert alert-{{ message.type }}" role="alert" *ngIf="message.show">
			<span *ngIf="message.title == null" [innerHTML]="message.text"></span>
			<ul class="alert-list" *ngIf="message.title">
				<li class="alert-first-list-item">{{ message.title }}</li>
				<li class="alert-list-item" *ngFor="let item of message.items">{{ item.text }}</li>
			</ul>
		</div>
	`,
	styles: [`
		.alert-first-list-item {
			font-size: 16px;
			font-weight: bold;
			margin-bottom: 10px;
		}
	`]
})

export class AlertMessageComponent {

	@Input()
	message: Object;

}
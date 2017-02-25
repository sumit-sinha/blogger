import { Component, Input } from "@angular/core";

@Component({
	selector: "navigation-bar",
	template: `
		<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation" *ngIf="data">
			<div class="container">
				<div class="navbar-header">
					<a class="navbar-brand" href="javascript:void(0);" 
						(click)="data.callback.fn($event, data.callback.args)">{{ data.title }}</a>
				</div>			
			</div>
		</nav>
	`
})

export class NavigationBarComponent {

	@Input()
	data: Object;
}
import { Component, Input } from '@angular/core';

@Component({
  selector: 'navigation-bar',
  template: `
		<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation" *ngIf="data">
			<div class="container">
				<div class="navbar-header">
					<a class="navbar-brand" href="javascript:void(0);"
						(click)="data.callback.fn($event, data.callback.args)">{{ data.title }}</a>
				</div>
				<div class="navbar-button" *ngIf="data.button">
					<button class="btn" type="button"
						(click)="data.button.callback.fn($event, data.button.callback.args)">
						{{ data.button.title }}
					</button>
				</div>
			</div>
		</nav>
	`,
  styles: [`
		.navbar-header {
			display: inline-block;
		}
		.navbar-button {
			float: right;
		}
		.navbar-button button {
			height: 40px;
			min-width: 85px;
			margin-top: 5px;
			background: #333333;
			border: none;
			color: white;
		}
		.navbar-button button:hover {
			color: #d4d4d4;
		}
	`]
})

export class NavigationBarComponent {

  @Input()
  data: any;
}

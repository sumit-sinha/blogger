import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';

@Component({
	selector: "blog-content",
	template: `
		<h1>{{ content.title }}</h1>
		<p class="lead">
			by <a href="javascript:void(0);" (click)="onLinkClick($event, content.author.link)">{{ content.author.name }}</a>
		</p>
		<hr>
		<div [innerHTML]="content.text"></div>
	`
})

export class BlogContentComponent {

	@Input()
	content: Object;

	constructor(private router: Router) { }

	/**
	 * function called when hyperlink is clicked
	 * @param $event {Object}
	 * @param url {String} url to navigate to
	 */
	onLinkClick($event, url) {
		this.router.navigateByUrl(url);
	}
}
import { Component, Input } from "@angular/core";

@Component({
	selector: "blog-content",
	template: `
		<h1>{{ content.title }}</h1>
		<p class="lead">
			by <a href="{{ content.author.link }}">{{ content.author.name }}</a>
		</p>
		<hr>
		<div [innerHTML]="content.text"></div>
	`
})

export class BlogContentComponent {

	@Input()
	content: Object;
}
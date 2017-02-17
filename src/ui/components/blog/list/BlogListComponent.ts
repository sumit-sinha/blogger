import { Component, Input } from "@angular/core";

@Component({
	selector: "blog-list",
	template: `
		<div class="well">
			<h4>{{ blogList.title }}</h4>
			<div class="row">
				<div class="col-lg-6">
					<ul class="list-unstyled">
						<li *ngFor="let item of blogList.items">
							<a href="{{ item.link }}">{{ item.title }}</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	`
})

export class BlogListComponent {

	@Input()
	blogList: Object
}
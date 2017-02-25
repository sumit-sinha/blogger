import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';

@Component({
	selector: "blog-list-page",
	template: `
		<div class="media" *ngFor="let blog of blogList | reverse" (click)="onLinkClick($event, {url: blog.url})">
			<a class="pull-left" href="javascript:void(0);">
				<img class="media-object" src="{{ blog.profile.image }}" alt="">
			</a>
			<div class="media-body">
				<h4 class="media-heading">{{ blog.title }}
					<small *ngIf="blog.postDate">
						{{ blog.postDate | date: "MMMM dd, yyyy" }} at {{ blog.postDate | date: "shortTime" }}
					</small>
				</h4>
				
				{{ blog.description }}
			</div>
		</div>
	`,
	styles: [".media:first-child{margin-top: 10px;} .media{cursor:pointer;}"]
})

export class BlogListPageComponent {

	@Input()
	blogList: Array;

	constructor(private router: Router) {

		if (this.blogList == null) {
			this.blogList = [];
		}
		
		this.blogList.push({
			profile: {
				image: "/images/newBlog.png"
			},
			url: "new",
			title: "Create New",
			description: "Go ahead and write a new blog. Share your experience and expertise with everyone " + 
			"around the globe and earn thier praise in exchange"
		});
	}

	/**
	 * function called when link is clicked
	 * @param $event
	 * @param args
	 */
	onLinkClick($event, args) {

		if (args == null || args.url == null) {
			return;
		}

		if (args.url === "new") {
			this.router.navigateByUrl("/new/blog");
			return;
		}

		this.router.navigateByUrl("/" + args.url);
	}
}
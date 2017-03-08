import { Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationDataHelper } from "../../../helpers/data/ApplicationDataHelper";

@Component({
	selector: "blog-page",
	template: `
		<div class="blog-content">
			<blog-content [content]="data"></blog-content>
			<hr>
			<comment-box [comments]="data.comments"></comment-box>
		</div>
	`
})

export class BlogPageComponent {

	data: Object;

	constructor(private router: Router, private route: ActivatedRoute) {

		let dataHelper = ApplicationDataHelper.getInstance(),
			isLoggedIn = dataHelper.getGlobalConfig("logged_in"),
			header = dataHelper.getGlobalConfig("header");

		if (isLoggedIn) {
			header.button = {
				title: dataHelper.getLabel("tx_edit_blog"),
				callback: {
					fn: this.onClick,
					args: { scope: this }
				}
			};
		}

		dataHelper.setData({
			type: "page",
			page: "index",
			data: {
				profile: dataHelper.getGlobalConfig("profile"),
				blogs: dataHelper.getGlobalConfig("blogs"),
				header: header
			}
		});

		this.route.params.subscribe((params) => {
			this.data = dataHelper.getPageData("blog");
		});
	}

	/**
	 * method called when content panel is clicked<br/>
	 * it will trigger a navigation to editor panel
	 * @param $event {Object}
	 * @param args {Object}
	 */
	onClick($event, args) {

		let scope = args.scope,
			params = scope.route.snapshot.params;

		scope.router.navigateByUrl("/" + params["blog"] + "/edit");
	}
}
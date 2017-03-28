import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ApplicationDataHelper } from "../../helpers/data/ApplicationDataHelper";

@Component({
	selector: "blog",
	template: `
	    <navigation-bar [data]="data.header"></navigation-bar>
	    <div class="container">
	        <div class="row">
	            <div class="col-lg-8">
	            	<router-outlet></router-outlet>
	            </div>
	            <div class="col-lg-4">
	            	<profile-summary [profile]="data.profile"></profile-summary>
	                <blog-list [blogList]="data.blogs" (onLinkClickError)="onLinkClickError()"></blog-list>
	            </div>
	        </div>
	    </div>
	`,
	styles: [`
		.container{margin-top: 60px;}
		@media (max-width: 600px) {
			.col-lg-8 {
				margin-bottom: 20px;
			}
		}
	`]
})

export class IndexPageComponent {

	data: Object;

	constructor(private router: Router) {

		this.data = { };
		this.recentBlogData={};
		let dataHelper = ApplicationDataHelper.getInstance();

		dataHelper.subscribeDataChange({
			type: "page",
			callback: {
				page: "index",
				fn: (data, args) => {			
					this.data = dataHelper.getPageData("index");
					this.setupHeader(dataHelper);
				}
			}
		});
		this.recentBlogData.blogs = this.data.blogs;
		this.recentBlogData.isRecentBlog = true;
	}

	/**
	 * function called when links are not responding
	 * @param error {Object}
	 * @param args {Object}
	 */
	onLinkClickError(error, args) {

	}

	/**
	 * function to setup header data
	 * @param dataHelper {ApplicationDataHelper}
	 */
	private setupHeader(dataHelper: ApplicationDataHelper) {
		if (this.data.header == null) {
			return;
		}

		this.data.header.callback = {fn: ($event) => { this.router.navigateByUrl("/") }};
	}
}

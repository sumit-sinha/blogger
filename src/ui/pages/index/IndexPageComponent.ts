import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ApplicationDataHelper } from "../../helpers/data/ApplicationDataHelper";

@Component({
	selector: "blog",
	template: `
	    <navigation-bar [data]="data.global.header"></navigation-bar>
	    <div class="container">
	        <div class="row">
	            <div class="col-lg-8">
	            	<router-outlet></router-outlet>
	            </div>
	            <div class="col-lg-4">
	                <blog-search [searchData]="data.search"></blog-search>
	                <blog-list [blogList]="data.page.blogList"></blog-list>
	                <profile-summary [profile]="data.global.profile"></profile-summary>
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

	private dataHelper: ApplicationDataHelper;

	constructor(private router: Router) {

		this.data = { global: {} };
		this.dataHelper = ApplicationDataHelper.getInstance();
		this.data.page = this.dataHelper.getPageData("index");

		router.events.subscribe((val) => {
			this.data.global = {
				header: this.dataHelper.getGlobalConfig("header"),
				footer: this.dataHelper.getGlobalConfig("footer"),
				profile: this.dataHelper.getGlobalConfig("profile")
			}

			if (this.data.global.header) {
				this.data.global.header.callback = {
					fn: this.onHeadClick,
					args: { scope: this }
				}
			}
		});
	}

	/**
	 * function called when title on header is clicked
	 * @param $event
	 * @param args
	 */ 
	private onHeadClick($event, args) {
		args.scope.router.navigateByUrl("/");
	}
}

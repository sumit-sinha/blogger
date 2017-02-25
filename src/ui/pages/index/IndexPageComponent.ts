import { Component } from "@angular/core";
import { Router } from '@angular/router';
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
	styles: [".container{margin-top: 60px;}"]
})

export class IndexPageComponent {

	data: Object;

	private dataHelper: ApplicationDataHelper;

	constructor(private router: Router) {
		this.dataHelper = ApplicationDataHelper.getInstance();
		let indexPageData = this.dataHelper.getPageData("index");

		this.data = {};
		this.data.page = indexPageData;
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

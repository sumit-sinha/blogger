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
	                <blog-search [searchData]="data.search"></blog-search>
	                <blog-list [blogList]="data.blogs"></blog-list>
	                <profile-summary [profile]="data.profile"></profile-summary>
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
	}

	/**
	 * function to setup header data
	 * @param dataHelper {ApplicationDataHelper}
	 */
	private setupHeader(dataHelper: ApplicationDataHelper) {
		if (this.data.header == null) {
			return;
		}

		this.data.header.callback = {
			fn: this.doNavigate,
			args: {
				url: "/",
				scope: this
			}
		};

		let isLoggedIn = dataHelper.getGlobalConfig("logged_in");
		if (isLoggedIn && this.data.header && this.data.header.button == null) {
			this.data.header.button = {
				title: dataHelper.getLabel("tx_new_blog"),
				callback: {
					fn: this.doNavigate,
					args: {
						url: "/new/blog",
						scope: this
					}
				}
			};
		}
	}

	/**
	 * function called when a button on header is clicked
	 * @param $event
	 * @param args
	 */ 
	private doNavigate($event, args) {
		args.scope.router.navigateByUrl(args.url);
	}
}

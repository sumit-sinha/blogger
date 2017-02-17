import { Component } from "@angular/core";

@Component({
	selector: "blog",
	template: `
	    <navigation-bar></navigation-bar>

	    <div class="container">

	        <div class="row">
	            <div class="col-lg-8">

	            </div>

	            <div class="col-md-4">

	                <blog-search [searchData]="data.search"></blog-search>

	                <blog-list [blogList]="data.blogList"></blog-list>
	                
	                <profile-summary [profile]="data.profile"></profile-summary>
	            </div>

	        </div>

	        <hr>

	        <footer-panel [footer]="data.footer"></footer-panel>

	    </div>
	`,
	styles: [".container{margin-top: 50px;}"]
})

export class IndexPageComponent {

	data = {
		blogList: {
			title: "Latest Blogs",
			items: [{
				link: "angular_require_karma",
				title: "Angular JS with TDD"
			}, {
				link: "grunt_build",
				title: "Starting with Grunt"
			}]
		},
		search: {
			title: "Blog Search"
		},
		profile: {

		},
		footer: {

		}
	}
}

import { Component } from "@angular/core";

@Component({
	selector: "blog-page",
	template: `
		<navigation-bar></navigation-bar>

		<div class="container">

			<div class="row">
				<div class="col-lg-8">

					<blog-content [content]="data.content"></blog-content>

					<hr>

					<comment-box [comments]="data.content.comments"></comment-box>

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
	`
})

export class BlogPageComponent {
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

		},
		content: {
			author: {
				name: "Sumit Sinha",
				link: "http://www.google.com/"
			},
			postDate: new Date(),
			title: "My First Blog",
			comments: [{
				profile: {
					name: "Start Bootstrap",
					image: "http://placehold.it/64x64",
					link: "http://www.google.com/"
				},
				message: {
					date: new Date(),
					text: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
				},
				children: [{
					comments: [{
						profile: {
							name: "Sub Bootstrap 1"
							image: "http://placehold.it/64x64",
							link: "http://www.google.com/"
						},
						message: {
							date: new Date(),
							text: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus."
						}
					}]
				}, {
					comments: [{
						profile: {
							name: "Sub Bootstrap 2"
							image: "http://placehold.it/64x64",
							link: "http://www.google.com/"
						},
						message: {
							date: new Date(),
							text: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus."
						}
					}]
				}]
			}]
		}
	}
}
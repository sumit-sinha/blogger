import { Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: "blog-page",
	template: `
		<div class="blog-content" (mouseenter)="onMouseMovement($event, 'blog-content-edit show')" 
				(mouseleave)="onMouseMovement($event, 'blog-content-edit')" (click)="onClick()">
			<blog-content [content]="data.content"></blog-content>
			<hr>
			<comment-box [comments]="data.content.comments"></comment-box>

			<div class="{{ editor_class }}">
				<span class="glyphicon glyphicon-edit"></span>
			</div>
		</div>
	`,
	styles: [`
		.blog-content .blog-content-edit {
			position: absolute;
			right: 0;
			top: 0;
			width: 30px;
			bottom: 0;
			background: #485a69;
			display: none;
			text-align: center;
			color: white;
			padding-top: 5px;
			font-size: 17px; }
			.blog-content .blog-content-edit.show {
			display: block; }

		.blog-content:hover {
			opacity: 0.4;
			padding: 0 10px;
			cursor: pointer;
			border: 1px solid #485a69; }
	`]
})

export class BlogPageComponent {

	editor_class: String;

	data = {
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
					image: "/images/comment.png",
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
							image: "/images/comment.png",
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
							image: "/images/comment.png",
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

	constructor(private router: Router, private route: ActivatedRoute) {
		this.editor_class = "blog-content-edit";
	}

	/**
	 * method called when content panel is clicked<br/>
	 * it will trigger a navigation to editor panel
	 */
	onClick() {
		let params = this.route.snapshot.params;
		this.router.navigateByUrl("/" + params["blog"] + "/edit");
	}

	/**
	 * method called when mouse enter or leaves the content panel
	 * @param $event Event object
	 * @param cssClass class to be applied
	 */
	onMouseMovement($event, cssClass) {
		this.editor_class = cssClass;
	}
}
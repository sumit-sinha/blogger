import { Component } from "@angular/core";

@Component({
	selector: "comment-box",
	template: `
		<div class="well">
			<h4>Leave a Comment:</h4>
			<form role="form">
				<div class="form-group">
					<textarea class="form-control" rows="3"></textarea>
				</div>
				<button type="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
		
		<hr>

		<comment-message [comments]=comments></comment-message>
	`
})

export class CommentBoxComponent {
	comments = [{
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
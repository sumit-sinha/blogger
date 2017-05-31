import { Component, Input } from '@angular/core';

@Component({
  selector: 'comment-box',
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

		<comment-message [comments]="comments"></comment-message>
	`
})

export class CommentBoxComponent {

  @Input()
  comments: any;
}

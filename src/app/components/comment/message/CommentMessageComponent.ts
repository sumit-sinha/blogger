import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'comment-message',
  template: `
		<div class="media" *ngFor="let comment of comments">
			<a class="pull-left" href="{{ comment.profile.link }}">
				<img class="media-object" src="{{ comment.profile.image }}" alt="">
			</a>
			<div class="media-body">
				<h4 class="media-heading">{{ comment.profile.name }}
					<small>{{ comment.message.date | date: "MMMM dd, yyyy" }} at {{ comment.message.date | date: "shortTime" }}</small>
				</h4>

				{{ comment.message.text }}

				<div class="sub-messages" *ngFor="let child of comment.children" >
					<comment-message [comments]="child.comments"></comment-message>
				</div>
			</div>
		</div>
	`,
  styles: [`.sub-messages{ padding-top: 15px; }`]
})

export class CommentMessageComponent {

  @Input()
  comments:  any;
}

import { Component, Input } from "@angular/core";

@Component({
	selector: "profile-summary",
	template: `
		<div class="well">
			<h4>Side Widget Well</h4>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, perspiciatis adipisci accusamus laudantium odit aliquam repellat tempore quos aspernatur vero.</p>
		</div>
	`
})

export class ProfileSummaryComponent {

	@Input()
	profile: Object;
}
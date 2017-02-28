import { Component, Input } from "@angular/core";

@Component({
	selector: "profile-summary",
	template: `
		<div class="well" *ngIf="profile">
			<h4>{{ profile.name }}</h4>
			<p>{{ profile.description }}</p>
		</div>
	`
})

export class ProfileSummaryComponent {

	@Input()
	profile: Object;
}
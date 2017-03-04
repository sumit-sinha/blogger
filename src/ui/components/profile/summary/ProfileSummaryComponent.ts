import { Component, Input } from "@angular/core";

@Component({
	selector: "profile-summary",
	template: `
		<div class="well" *ngIf="profile">
			<h4>{{ profile.name }}</h4>
			<p [innerHTML]="profile.description | trim: 200"></p>
			<div *ngIf="profile.links">
				<p class="profile-link" *ngFor="let link of profile.links">{{ link.type }} - <a href="{{ link.url }}" target="_blank">{{ link.url }}</a></p>
			</div>
		</div>
	`,
	styles: [`p.profile-link {margin: 0;}`]
})

export class ProfileSummaryComponent {

	@Input()
	profile: Object;
}
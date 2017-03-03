import { Component } from "@angular/core";
import { ApplicationDataHelper } from "../../helpers/data/ApplicationDataHelper";

@Component({
	selector: "profile-page",
	template: `
		<div class="well" *ngIf="profile.name || profile.description">
			<h4>{{ labels.tx_about_me }}</h4>
			<div [innerHTML]="profile.description"></div>
		</div>
		<div class="well profile-links" *ngIf="profile.links">
			<h4>{{ labels.tx_profile_links }}</h4>
			<p *ngFor="let link of profile.links">{{ link.type }} - <a href="{{ link.url }}" target="_blank">{{ link.url }}</a></p>
		</div>
	`,
	styles: [`.profile-links p {margin:0;}`]
})

export class ProfilePageComponent {

	labels: Object;

	profile: Object;

	constructor() {

		let dataHelper = ApplicationDataHelper.getInstance();

		this.profile = dataHelper.getGlobalConfig("profile");
		this.labels = {
			"tx_about_me": dataHelper.getLabel("tx_about_me"),
			"tx_profile_links": dataHelper.getLabel("tx_profile_links")
		};

		dataHelper.setData({
			type: "page",
			page: "index",
			data: {
				profile: null,
				blogs: dataHelper.getGlobalConfig("blogs"),
				header: dataHelper.getGlobalConfig("header"),
				footer: dataHelper.getGlobalConfig("footer")
			}
		});
	}
}
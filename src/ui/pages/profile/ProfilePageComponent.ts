import { Component } from "@angular/core";
import { Router } from "@angular/router";
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

	constructor(private router: Router) {

		let dataHelper = ApplicationDataHelper.getInstance(),
			header = dataHelper.getGlobalConfig("header"),
			isLoggedIn = dataHelper.getGlobalConfig("logged_in");

		this.profile = dataHelper.getGlobalConfig("profile");
		this.labels = {
			"tx_about_me": dataHelper.getLabel("tx_about_me"),
			"tx_profile_links": dataHelper.getLabel("tx_profile_links")
		};

		if (isLoggedIn) {
			header.button = {
				title: dataHelper.getLabel("tx_new_blog"),
				callback: {fn: () => { this.router.navigateByUrl("/new/blog"); }}
			};
		}

		dataHelper.setData({
			type: "page",
			page: "index",
			data: {
				profile: null,
				header: header,
				blogs: dataHelper.getGlobalConfig("blogs"),
				footer: dataHelper.getGlobalConfig("footer")
			}
		});
	}
}
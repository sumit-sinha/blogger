import { Component, Input } from "@angular/core";
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ApplicationDataHelper } from "../../../helpers/data/ApplicationDataHelper";

@Component({
	selector: "blog-content",
	template: `
		<h1>{{ content.title }}</h1>
		<p class="lead">
			by <a href="javascript:void(0);" (click)="onLinkClick($event, content.author.link)">{{ content.author.name }}</a>
		</p>
		<hr>
		<p><span class="glyphicon glyphicon-time"></span>{{ getPostedOnMessage() }}</p>
		<hr>
		<div [innerHTML]="unescapeContent(content.text)"></div>
	`,
	providers:[DatePipe],
	styles: [`span.glyphicon{margin-right:5px;font-size:12px;}`]
})

export class BlogContentComponent {

	@Input()
	content: Object;

	constructor(private router: Router,
				private datePipe: DatePipe) {}

	/**
	 * function called when hyperlink is clicked
	 * @param $event {Object}
	 * @param url {String} url to navigate to
	 */
	onLinkClick($event, url) {
		this.router.navigateByUrl(url);
	}

	/**
	 * function to unescape HTML characters
	 * @param text {String}
	 @ return {String}
	 */
	unescapeContent(text: String): String {
		return unescape(text);
	}

	/**
	 * function to create a Posted On message using date parameters
	 * @return {String}
	 */
	getPostedOnMessage() {
		let label = ApplicationDataHelper.getInstance().getLabel("tx_posted_on"),
			date = this.getDateFromArray(this.content.jsDate);

		label = label.replace("{0}", this.datePipe.transform(date, "MMMM dd, yyyy"));
		label = label.replace("{1}", this.datePipe.transform(date, "hh:mm a"));

		return label;
	}

	/**
	 * function to get a {Date} object from an {Array}
	 * @param dateArray {Array}
	 * @return {Date}
	 */
	private getDateFromArray(dateArray: Array): Date {
		return new Date(dateArray[0], dateArray[1], dateArray[2], 
			dateArray[3], dateArray[4], dateArray[5]);
	}
}
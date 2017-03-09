import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { ApplicationDataHelper } from "../../../helpers/data/ApplicationDataHelper";
import { NetworkRequestHelper } from "../../../helpers/network/NetworkRequestHelper";

@Component({
	selector: "blog-list",
	template: `
		<div class="well">
			<h4>{{ dataHelper.getLabel("tx_latest_blogs") }}</h4>
			<div class="row">
				<div class="col-lg-12">
					<ul class="list-unstyled">
						<ng-container *ngIf="blogList && blogList?.length > 0">
							<li *ngFor="let blog of blogList | reverse">
								{{ getDateFromArray(blog.jsDate) | date: "dd MMM yyyy" }} - <a href="javascript:void(0)" (click)="onLinkClick($event, blog.title)">{{ blog.heading }}</a>
							</li>
						</ng-container>
						<li *ngIf="blogList == null || blogList?.length == 0">
							{{ dataHelper.getLabel("tx_blog_list_zero") }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	`
})

export class BlogListComponent {

	@Input()
	blogList: Object;

	@Output()
	onLinkClickError = new EventEmitter<any>();

	dataHelper: ApplicationDataHelper;

	constructor(private router: Router,
				private networkHelper: NetworkRequestHelper) {
		this.dataHelper = ApplicationDataHelper.getInstance();
	}

	/**
	 * function to get a {Date} object from an {Array}
	 * @param dateArray {Array}
	 * @return {Date}
	 */
	getDateFromArray(dateArray: Array): Date {
		return new Date(dateArray[0], dateArray[1], dateArray[2]);
	}

	/**
	 * function called when link is clicked
	 * @param $event {Object}
	 * @param link {String}
	 */
	onLinkClick($event, link) {

		this.networkHelper.request({
			url: "/" + link + "?is_json=true",
			method: "GET",
			callback: {
				success: {
					fn: this.onLinkClickCallback, 
					args: { scope: this, link: link }
				},
				error: {
					fn: this.onLinkClickCallbackError,
					args: { scope: this, link: link }
				}
			}
		});
	}

	/**
	 * function called when we receive a success response from server call
	 * @param response {Object}
	 * @param args {Object}
	 */
	private onLinkClickCallback(response, args) {
		let scope = args.scope,
			json = {};

		try { json = JSON.parse(response._body); } 
		catch (e) {}

		if (json.data == null || json.data.blog == null || json.data.global == null) {
			scope.onLinkClickError.emit({code: 0}, args);
		}

		let blogPageData = scope.dataHelper.getPageData("blog") || {};
		for (let key in json.data.blog) {
			if (json.data.blog.hasOwnProperty(key)) {
				blogPageData[key] = json.data.blog[key];
			}
		}

		scope.dataHelper.setData({
			type: "page",
			page: "blog",
			data: blogPageData
		});

		for (let key in json.global) {
			if (json.global.hasOwnProperty(key)) {
				scope.dataHelper.setData({
					type: "global",
					key: key,
					data: json.global[key]
				});
			}
		}
		
		window.scroll(0, 0);
		scope.router.navigateByUrl("/" + args.link);
	}

	/**
	 * function called when we receive a error response from server call
	 * @param error {Object}
	 * @param args {Object}
	 */
	private onLinkClickCallbackError(error, args) {
		args.scope.onLinkClickError.emit(error, args);
	}
}
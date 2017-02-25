import { Component, Input } from "@angular/core";
import { ApplicationDataHelper } from "../../../helpers/data/ApplicationDataHelper";

@Component({
	selector: "blog-list",
	template: `
		<div class="well">
			<h4>{{ dataHelper.getLabel("tx_latest_blogs") }}</h4>
			<div class="row">
				<div class="col-lg-12">
					<ul class="list-unstyled">
						<li *ngFor="let item of blogList.items">
							<a href="{{ item.link }}">{{ item.title }}</a>
						</li>
						<li *ngIf="blogList.items == null || blogList.items?.length == 0">
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

	dataHelper: ApplicationDataHelper;

	constructor() {
		this.dataHelper = ApplicationDataHelper.getInstance();
	}
}
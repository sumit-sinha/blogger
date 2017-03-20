import { Component, Input } from "@angular/core";
import { ApplicationDataHelper } from "../../../helpers/data/ApplicationDataHelper";

@Component({
	selector: "blog-search",
	template: `
		<div class="well">
			<h4>{{ this.dataHelper.getLabel("tx_search_blog") }}</h4>
			<div class="input-group">
				<input type="text" #searchContent class="form-control">
				<span class="input-group-btn">
					<button class="btn btn-default" type="button" (click)="onSearchBlogClick(searchContent.value)">
						<span class="glyphicon glyphicon-search"></span>
					</button>
				</span>
			</div>
			<blog-list *ngIf="searchContentData != null && searchContentData.isSearchContent" [blogList]="searchContentData" (onLinkClickError)="onLinkClickError()"></blog-list>

		</div>
	`
})

export class BlogSearchComponent {

	@Input()
	searchData: Object;

	constructor() {
		this.searchContentData={};
		this.searchContentData.isSearchContent = false;
		this.data = { };
		this.searchedData = { };
		this.filteredData=[];
		this.dataHelper = ApplicationDataHelper.getInstance();

		this.dataHelper.subscribeDataChange({
			type: "page",
			callback: {
				page: "index",
				fn: (data, args) => {			
					this.data = this.dataHelper.getPageData("index");
					this.searchedData = this.dataHelper.getPageData("index");
				}
			}
		});
	}

	/**
	 * function called when user clicks on button
	 * @param $event {Object}
	 */
	onSearchBlogClick(userSearch: string) {
        this.filteredData=[];
        let searchedString = userSearch.toLowerCase();
        for (var key in this.searchedData.blogs) {
            if (this.searchedData.blogs.hasOwnProperty(key)) {
                if ((this.searchedData.blogs[key].title.toLowerCase().indexOf(searchedString) >= 0) ||
                    (this.searchedData.blogs[key].author.toLowerCase().indexOf(searchedString) >= 0) ||
                    (this.searchedData.blogs[key].heading.toLowerCase().indexOf(searchedString) >= 0)) {
                    this.filteredData.push(this.searchedData.blogs[key]);
                }
            }
        }
   		this.searchContentData.blogs = this.filteredData;
        this.searchContentData.isSearchContent = true;

	}

	/**
	 * function called when links are not responding
	 * @param error {Object}
	 * @param args {Object}
	 */
	onLinkClickError(error, args) {

	}
}
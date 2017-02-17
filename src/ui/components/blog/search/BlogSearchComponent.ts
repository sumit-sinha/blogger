import { Component, Input } from "@angular/core";

@Component({
	selector: "blog-search",
	template: `
		<div class="well">
			<h4>{{ searchData.title }}</h4>
			<div class="input-group">
				<input type="text" class="form-control">
				<span class="input-group-btn">
					<button class="btn btn-default" type="button">
						<span class="glyphicon glyphicon-search"></span>
					</button>
				</span>
			</div>
		</div>
	`
})

export class BlogSearchComponent {

	@Input()
	searchData: Object;
}
import { Component, Input } from "@angular/core";

@Component({
	selector: "footer-panel",
	template: `
		<footer>
			<div class="row">
				<div class="col-lg-12">
					<p>Copyright &copy; Your Website 2014</p>
				</div>
			</div>
		</footer>
	`
})

export class FooterComponent {

	@Input()
	footer: Object
}
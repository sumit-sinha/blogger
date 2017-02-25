import { Component, Input } from "@angular/core";
import { ApplicationDataHelper } from "../../../helpers/data/ApplicationDataHelper";
import { NetworkRequestHelper } from "../../../helpers/network/NetworkRequestHelper";
import { ValidationType } from "../../../helpers/validation/ValidationType";
import { ValidationHelper } from "../../../helpers/validation/ValidationHelper";

@Component({
	selector: "profile-login",
	template: `
		<form class="form-signin" (submit)="onFormSubmission($event)">
			<h2 class="form-signin-heading">{{ dataHelper.getLabel("tx_please_sign_in") }}</h2>
			<input-box [data]="fields[0]"></input-box>
			<input-box [data]="fields[1]"></input-box>
			<check-box [data]="fields[2]"></check-box>
			<button class="btn btn-lg btn-primary btn-block" type="submit">{{ dataHelper.getLabel("tx_sign_in") }}</button>
		</form>
	`,
	styles: [`
		.form-signin {
			max-width: 330px;
			padding: 15px;
			margin: 0 auto;
		}
		.form-signin .form-signin-heading,
		.form-signin .checkbox {
			margin-bottom: 10px;
		}
		.form-signin .checkbox {
			font-weight: normal;
		}
		.form-signin >>> .form-control {
			position: relative;
			height: auto;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			padding: 10px;
			font-size: 16px;
		}
		.form-signin >>> .form-control:focus {
			z-index: 2;
		}
		.form-signin >>> input[type="email"] {
			margin-bottom: -1px;
			border-bottom-right-radius: 0;
			border-bottom-left-radius: 0;
		}
		.form-signin >>> input[type="password"] {
			margin-bottom: 10px;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
		}

		@media (max-width: 600px) {
			.form-signin {
				max-width: 600px;
			}
		}
	`]
})

export class ProfileLoginComponent {

	@Input()
	data: Object;

	emailField: Object;

	passwordField: Object;

	dataHelper: ApplicationDataHelper;

	constructor(private networkHelper: NetworkRequestHelper, 
				private validator: ValidationHelper) {
		this.dataHelper = ApplicationDataHelper.getInstance();
		this.fields = [{
			label: { text: this.dataHelper.getLabel("tx_email_address") },
			input: {
				id: "user_name",
				type: "email",
				autofocus: true,
				placeholder: this.dataHelper.getLabel("tx_email_address"),
				validations: [{ type: ValidationType.EMAIL }]
			}
		}, {
			label: { text: this.dataHelper.getLabel("tx_password") },
			input: {
				id: "password",
				type: "password",
				placeholder: this.dataHelper.getLabel("tx_password"),
				validations: [{ type: ValidationType.MANDATORY }]
			}
		}, {
			label: { text: this.dataHelper.getLabel("tx_remember_me") },
			input: { }
		}];
	}

	/**
	 * function called on form submission
	 * @param $event {Object}
	 */
	onFormSubmission($event) {
		
		$event.preventDefault();

		let validationStatus = this.validator.validateForm(this.fields);
		if (validationStatus.valid) {
			this.networkHelper.request({
				url: "/profile/login",
				method: "POST",
				parameters: {
					param1: "somevalue",
					param2: "someothervalue"
				},
				callback: {
					success: this.onFormSubmissionSuccess,
					error: this.onFormSubmissionError
				}
			});
		}
	}

	private onFormSubmissionSuccess() {
		console.log("success");
	}

	private onFormSubmissionError() {
		console.log("error");
	}
}
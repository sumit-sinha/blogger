import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { ApplicationDataHelper } from "../../../helpers/data/ApplicationDataHelper";
import { NetworkRequestHelper } from "../../../helpers/network/NetworkRequestHelper";

@Component({
	selector: "blog-edit",
	template: `
		<form>

			<alert-message [message]="error"></alert-message>

			<div [hidden]="!preview.enabled" 
				[innerHTML]="preview.content" 
				class="blog-preview">
			</div>
			<blog-editor
				[elementId]="'blog-editor'"
				(onEditorInit)="editorInitFunction($event)" 
				(onEditorKeyup)="keyupHandlerFunction()" 
				[hidden]="preview.enabled"
			></blog-editor>
			
			<div class="btn-container" *ngIf="editor">
				<button type="button" class="btn btn-success" (click)="onSaveClick($event, 0)">{{ dataHelper.getLabel("tx_button_save") }}</button>
				<button type="button" class="btn btn-info" (click)="onSaveClick($event, 1)">{{ dataHelper.getLabel("tx_button_save_draft") }}</button>
				<button type="button" class="btn btn-primary" (click)="onPreviewClick()">{{ preview.label }}</button>
			</div>

			<div *ngIf="loading || editor == null" class="msk {{loading}}"></div>
		</form>
	`,
	styles: [`
		button{width: 100px;}
		:host(.container){margin-bottom:60px;}
		.btn-container{
			background: rgba(35, 35, 35, 0.83);
			height: 50px;
			padding-top: 8px;
			padding-bottom: 5px;
			padding-right: 10px;
			text-align: right;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 9;
		}
		.msk {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			z-index: 10;
			background: url(/images/gears.gif) no-repeat center;
			background-color: rgba(30, 31, 31, 0.85);
		}
		.msk.loading {
			background: url(/images/loading.gif) no-repeat center;
		}
		@media (max-width: 600px) {
			form{margin-bottom:20px;}
		}
	`]
})

export class BlogEditPageComponent {

	error: Object;

	loading: String;

	editor: Object;

	preview: Object;

	dataHelper: ApplicationDataHelper;

	constructor(private router: Router,
				private networkHelper: NetworkRequestHelper) {

		this.error = {};
		this.loading = null;
		this.dataHelper = ApplicationDataHelper.getInstance();

		this.preview = { 
			enabled: false, 
			content: null,
			label: this.dataHelper.getLabel("tx_button_preview")
		};

		this.dataHelper.setData({
			type: "page",
			page: "index",
			data: {
				profile: this.dataHelper.getGlobalConfig("profile"),
				blogs: this.dataHelper.getGlobalConfig("blogs"),
				header: this.dataHelper.getGlobalConfig("header")
			}
		});
	}

	/**
	 * function called when key is pressed on editor
	 * @param $event
	 */
	keyupHandlerFunction($event) {
		// nothing for now
	}

	/**
	 * function called when editor is initialized
	 * @param editor {TinyMce} editor instance
	 */
	editorInitFunction(editor) {
		this.loading = null;
		this.editor = editor;
	}

	/**
	 * function called when save button is clicked
	 * @param $event {Object}
	 * @param type {Number}
	 */
	onSaveClick($event, type) {

		// reset
		this.error = {};
		this.loading = "loading";

		let content = null;
		if (this.preview.enabled) {
			content = this.preview.content;
		} else {
			content = this.editor.getContent();
		}

		if (content == null || content.trim() === "") {
			this.showError({ errors: [this.dataHelper.getLabel("tx_empty_blog_error")] });
			this.loading = null;
			return;
		}

		let contentInformation = this.processContent(content),
			parameters = {
				type: type,
				content: contentInformation.content,
				title: contentInformation.id,
				heading: contentInformation.title
			},
			callbackArguments = {
				scope: this,
				parameters: parameters
			};

		this.networkHelper.request({
			url: "/new/blog",
			method: "POST",
			parameters: parameters,
			callback: {
				success: {
					fn: this.onSaveCallback, 
					args: callbackArguments
				},
				error: {
					fn: this.onSaveErrorCallback,
					args: callbackArguments
				}
			}
		});
	}

	/**
	 * function called when preview button is clicked
	 */
	onPreviewClick() {

		// reset
		this.error = {};

		if (this.preview.enabled) {
			this.preview.enabled = false;
			this.editor.setContent(this.preview.content);
			this.preview.label = this.dataHelper.getLabel("tx_button_preview");
			return;
		}

		this.preview.enabled = true;
		this.preview.label = this.dataHelper.getLabel("tx_button_edit");
		this.preview.content = this.editor.getContent();
	}

	/**
	 * function called when save is success
	 * @param response {Object}
	 * @param args {Object}
	 */
	private onSaveCallback(response, args) {
		
		let scope = args.scope,
			profile = scope.dataHelper.getGlobalConfig("profile"),
			json = {};

		try { json = JSON.parse(response._body); } 
		catch (e) { json.errors = [this.dataHelper.getLabel("tx_response_error")] }

		if (json && json.success) {

			scope.dataHelper.setData({
				type: "page",
				page: "blog",
				data: {
					author: {
						name: profile.name,
						link: "/"
					},
					type: args.parameters.type,
					text: args.parameters.content,
					title: args.parameters.heading,
					postDate: args.parameters.postDate
				}
			});

			scope.router.navigateByUrl("/" + args.parameters.title);

			return;
		}

		let errors = [];
		if (json.errors) {
			errors = json.errors;
		} else {
			errors.push(scope.dataHelper.getLabel("tx_response_error"));
		}

		scope.showError({ errors: errors });
		scope.loading = null;
	}

	/**
	 * function called when save has failed
	 * @param response {Object}
	 * @param args {Object}
	 */
	private onSaveErrorCallback(response, args) {
		
		let scope = args.scope,
			errors = [scope.dataHelper.getLabel("tx_network_error")];

		scope.showError({ errors: errors });
		scope.loading = null;
	}

	/**
	 * function to generate a random title for application
	 * @param content {Object}
	 */
	private processContent(content: String): Object {

		if (content == null || content.trim() === "") {
			return "";
		}

		let newLineIndex = content.indexOf("\n");
		if (newLineIndex === -1) {
			newLineIndex = content.length;
		}

		let firstLine = content.substring(0, newLineIndex),
			contentWithoutHTML = this.trimHTMLTags(firstLine)
			content = content.substring(newLineIndex + 1);

		return {
			content: content,
			title: contentWithoutHTML,
			id: contentWithoutHTML.replace(" ", "_").toLowerCase()
		}
	}

	/**
	 * function to replace all the HTML tags from string
	 * @param content {String}
	 * @return {String}
	 */
	private trimHTMLTags(content: String): String {

		if (content == null) {
			return "";
		}

		return content.replace(/<[^>]*>/ig, ' ')
					.replace(/<\/[^>]*>/ig, ' ')
					.replace(/&nbsp;|&#160;/gi, ' ')
					.replace(/\s+/ig, ' ')
					.trim();
	}

	/**
	 * function called to display error messages in UI
	 * @param args {Object}
	 */
	private showError(args: Object) {
		
		this.error.show = true;
		this.error.type = "danger";
		this.error.title = this.dataHelper.getLabel("tx_error_messages");
		this.error.items = this.error.items || [];
		
		for (let i = 0; i < args.errors.length; i++) {
			this.error.items.push({ text: args.errors[i] });
		}
	}
}

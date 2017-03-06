import { Component } from "@angular/core";
import { ApplicationDataHelper } from "../../../helpers/data/ApplicationDataHelper";
import { NetworkRequestHelper } from "../../../helpers/network/NetworkRequestHelper";

@Component({
	selector: "blog-edit",
	template: `
		<form>
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
			
			<div class="btn-container" *ngIf="ready">
				<button type="button" class="btn btn-success" (click)="onSaveClick($event, 0)">{{ dataHelper.getLabel("tx_button_save") }}</button>
				<button type="button" class="btn btn-info" (click)="onSaveClick($event, 1)">{{ dataHelper.getLabel("tx_button_save_draft") }}</button>
				<button type="button" class="btn btn-primary" (click)="onPreviewClick()">{{ preview.label }}</button>
			</div>

			<div *ngIf="!ready" class="msk loading"></div>
		</form>
	`,
	styles: [`
		button{width: 100px;}
		form{margin-bottom:60px;}
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
		@media (max-width: 600px) {
			form{margin-bottom:20px;}
		}
	`]
})

export class BlogEditPageComponent {

	ready: Boolean;

	preview: Object;

	editor: any;

	dataHelper: ApplicationDataHelper;

	constructor(private networkHelper: NetworkRequestHelper) {

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
		this.ready = true;
		this.editor = editor;
	}

	/**
	 * function called when save button is clicked
	 * @param $event {Object}
	 * @param type {Number}
	 */
	onSaveClick($event, type) {

		let content = null;
		if (this.preview.enabled) {
			content = this.preview.content;
		} else {
			content = this.editor.getContent();
		}

		this.networkHelper.request({
			url: "/new/blog",
			method: "POST",
			parameters: {
				type: type,
				content: content,
				title: this.getContentTitle(content)
			},
			callback: {
				success: {
					fn: this.onSaveCallback, 
					args: {
						scope: this,
						type: type
					}
				},
				error: {
					fn: this.onSaveErrorCallback,
					args: {
						scope: this,
						type: type
					}
				}
			}
		});
	}

	/**
	 * function called when preview button is clicked
	 */
	onPreviewClick() {

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
		console.log("success");
	}

	/**
	 * function called when save has failed
	 * @param response {Object}
	 * @param args {Object}
	 */
	private onSaveErrorCallback(response, args) {
		console.log("error");
	}

	/**
	 * function to generate a random title for application
	 * @param content {String}
	 */
	private getContentTitle(content: String): String {

		if (content == null || content.trim() === "") {
			return "";
		}

		let newLineIndex = content.indexOf("\n");
		if (newLineIndex === -1) {
			newLineIndex = content.length - 1;
		}

		let firstLine = this.trimHTMLTags(content.substring(0, newLineIndex));
		return firstLine.substring(0, 25).replace(" ", "_").toLowerCase();
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
}

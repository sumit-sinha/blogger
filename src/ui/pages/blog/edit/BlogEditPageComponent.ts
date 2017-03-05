import { Component } from "@angular/core";
import { ApplicationDataHelper } from "../../../helpers/data/ApplicationDataHelper";

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
				<button type="button" class="btn btn-success" (click)="onSaveClick()">Save</button>
				<button type="button" class="btn btn-primary" (click)="onPreviewClick()">Preview</button>
				<button type="button" class="btn btn-danger" (click)="onCancelClick()">Cancel</button>
			</div>

			<div *ngIf="!ready" class="msk loading"></div>
		</form>
	`,
	styles: [`
		button{width: 100px;}
		.container{margin-top: 60px;margin-bottom:60px;}
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
	`]
})

export class BlogEditPageComponent {

	ready: Boolean;

	preview: Object;

	editor: any;

	constructor() {

		let dataHelper = ApplicationDataHelper.getInstance();

		this.preview = { enabled: false, content: null };
		dataHelper.setData({
			type: "page",
			page: "index",
			data: {
				profile: dataHelper.getGlobalConfig("profile"),
				blogs: dataHelper.getGlobalConfig("blogs"),
				header: dataHelper.getGlobalConfig("header")
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
	 */
	onSaveClick() {

	}

	/**
	 * function called when preview button is clicked
	 */
	onPreviewClick() {
		this.preview.enabled = true;
		this.preview.content = this.editor.getContent();
	}

	/**
	 * function called when cancel button is clicked
	 */
	onCancelClick() {
		history.go(-1);
	}
}
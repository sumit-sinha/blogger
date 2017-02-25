import { Component } from "@angular/core";

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
				(onEditorKeyup)="keyupHandlerFunction($event)" 
				[hidden]="preview.enabled"
			></blog-editor>
			
			<div class="btn-container">
				<button type="button" class="btn btn-success" (click)="onSaveClick()">Save</button>
				<button type="button" class="btn btn-primary" (click)="onPreviewClick()">Preview</button>
				<button type="button" class="btn btn-danger" (click)="onCancelClick()">Cancel</button>
			</div>
		</form>
	`,
	styles: [`
		button{width: 100px;}
		.container{margin-top: 60px;}
		.btn-container{text-align:right;margin-top:10px}
	`]
})

export class BlogEditPageComponent {

	preview: Object;

	constructor() {
		this.preview = { enabled: false, content: null };
	}

	/**
	 * function called when key is pressed on editor
	 * @param $event
	 */
	keyupHandlerFunction($event) {
		// nothing for now
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
		this.preview.content = tinyMCE.activeEditor.getContent();
	}

	/**
	 * function called when cancel button is clicked
	 */
	onCancelClick() {
		history.go(-1);
	}
}
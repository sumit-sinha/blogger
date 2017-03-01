import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from "@angular/core";

@Component({
  selector: "blog-editor",
  template: `
  	<textarea id="{{ elementId }}"></textarea>
  `
})

export class BlogEditorComponent implements AfterViewInit, OnDestroy {
  
  @Input() 
  elementId: String;

  @Output()
  onEditorKeyup = new EventEmitter<any>();

  @Output()
  onEditorInit = new EventEmitter<any>();

  editor: Object;

  ngAfterViewInit() {

    tinymce.init({
      selector: "#" + this.elementId,
      height: 500,
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
      ],
      toolbar1: "undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright " + 
              "alignjustify | bullist numlist outdent indent | link image | print preview media | " + 
              "forecolor backcolor emoticons | codesample",
      toolbar2: '',
      image_advtab: true,
      content_css: "/styles/bootstrap.css",
      skin_url: "/styles/tinymce_skin_lightgray",
      setup: editor => {
        this.editor = editor;
        editor.on("keyup", () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });

        editor.on("init", () => {
          this.onEditorInit.emit(editor);
        });
      }
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}

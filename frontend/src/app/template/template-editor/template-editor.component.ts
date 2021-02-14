import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

export enum EEditStatus {
  INPUT,
  RENDER
}

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.css']
})
export class TemplateEditorComponent implements OnInit {
  name = 'Angular 6';
  @Input() val = '';
  htmlContent = '';
  acceptInput: boolean = true;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    // defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor() {
    this.acceptInput = true;
    this.htmlContent = this.val;
    console.log("------------------")
    console.log(this.htmlContent);
  }

  ngOnInit(): void {
    this.htmlContent = this.val;
    console.log("------------------")
    console.log(this.htmlContent);
  }
}

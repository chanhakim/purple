import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { EStatus, IResponse } from '../models/status';
import { ISimpleTemplate, ITemplateData } from '../models/template-data';
import { ActivatedRoute, Router } from '@angular/router';
import { selectNews, selectTemplate } from '../store/selectors/data.selectors';
import { IAppState } from '../store/state/app.state';
import { select, Store } from '@ngrx/store';
import { INewsStoriesValued } from '../models/officials';
import { TemplateEditorComponent } from './template-editor/template-editor.component';
import { SelectedNews, UpdateTemplate } from '../store/actions/data.actions';
import { validate } from 'uuid';
import { IDataState } from '../store/state/data.state';
import { GetTemplateService } from '../service/get-template.service';
import { EEditStatus } from './template-editor/template-editor.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  emailForm = this.formBuilder.group({
    to: '',
    from: '',
    subj: '',
    message: '',
  });
  url = 'http://localhost:3000/api/templates/';
  status = EStatus.NONE;
  error_msg = '';
  exportStatus = EStatus;
  idVal: string | null = null;
  selectedNewsStory$ = this.store.pipe(select(selectTemplate));
  selectedNews: ITemplateData | null = null;
  @ViewChild(TemplateEditorComponent) editor: any;
  editorStatus = true;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    public router: Router,
    private getTemp: GetTemplateService
  ) {
    this.selectedNewsStory$.subscribe((data) => {
      console.log(data !== null ? data : 'null data');
      if (data !== null) {
        this.selectedNews = data;

        this.emailForm.setValue({
          ...this.emailForm.value,
          to: data.to,
          from: data.from,
          subj: data.subject,
          message: data.body,
        });
        console.log('=====');
        console.log(this.emailForm.value.message);
      }
    });
  }

  ngOnInit(): void {
    this.idVal = this.route.snapshot.paramMap.get('id');
    console.log(this.idVal);

    this.selectedNewsStory$.subscribe((data) => {
      if (data === null) {
        this.getTemp.getTemplate(this.idVal).subscribe((resp) => {
          this.emailForm.setValue({
            ...this.emailForm.value,
            to: resp === null ? '' : resp.to,
            from: resp === null ? '' : resp.from,
            subj: resp === null ? '' : resp.subject,
            message: resp === null ? '' : '<p>' + resp.body + '</p>',
          });
          console.log(this.emailForm.value.message);
          this.editor.htmlContent = this.emailForm.value.message;
          // this.editor.htmlContent = `<h1><font face="ariel">Hello</font>World</h1>`;
        });
        this.store.dispatch(
          new SelectedNews({
            id: '',
            uuid: this.idVal !== null ? this.idVal : '',
            headline: this.emailForm.value.subj,
            body: this.emailForm.value.message,
            zip_code: [],
            link: '',
            tag: '',
          })
        );
      }
    });
  }

  onSubmit(): void {
    console.log(this.emailForm.value);
    var val = this.emailForm.value;
    var templateClass: ITemplateData = {
      template_id: this.idVal !== null ? this.idVal : '',
      to: val.to,
      from: val.from,
      subject: val.subj,
      body: this.editor.htmlContent,
    };

    this.store.dispatch(new UpdateTemplate(templateClass));

    console.log("===========================", this.editorStatus);
    if (this.editorStatus) {
      console.log("IT POSTED!!!!")
      this.http.post<IResponse>(this.url, templateClass)
        .subscribe((data) => {
          this.status = data.success ? EStatus.SUCCESS : EStatus.FAILURE;
          this.error_msg = data.error_msg;
        })
    }

    this.editorStatus = false;
    this.editor.acceptInput = false;
  }

  backToNews() {
    var val = this.emailForm.value;
    console.log(this.editor.htmlContent);
    var templateClass: ITemplateData = {
      template_id: this.idVal !== null ? this.idVal : '',
      to: val.to,
      from: val.from,
      subject: val.subj,
      body: this.editor.htmlContent,
    };

    this.store.dispatch(new UpdateTemplate(templateClass));

    this.router.navigate(['/local-issues']);
  }

  toEdit() {
    this.editorStatus = true;
    this.editor.acceptInput = true;
  }

  sendEmail() {
    // var mailText = "mailto:abc@abc.com+?subject=files&body="+this.links.join(" ,");
    var mailText = 'mailto:quinnang.gill@gmail.com';

    mailText += '?subject=' + this.emailForm.value.subj;
    mailText += '&html-body=' + this.emailForm.value.message;

    console.log(mailText);
    window.location.href = mailText;
  }

  copyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.href.replace("template", "redirect");
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    var val = this.emailForm.value;
    var templateClass: ITemplateData = {
      template_id: this.idVal !== null ? this.idVal : '',
      to: val.to,
      from: val.from,
      subject: val.subj,
      body: this.editor.htmlContent
    }

    this.store.dispatch(new UpdateTemplate(
      templateClass
    ))

    console.log("===========================", this.editorStatus);
    if (this.editorStatus) {
      console.log("IT POSTED!!!!")
      this.http.post<IResponse>(this.url, templateClass)
        .subscribe((data) => {
          this.status = data.success ? EStatus.SUCCESS : EStatus.FAILURE;
          this.error_msg = data.error_msg;
        })
    }
  }
}

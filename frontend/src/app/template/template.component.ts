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
import { UpdateTemplate } from '../store/actions/data.actions';
import { validate } from 'uuid';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  emailForm = this.formBuilder.group({
    to: '',
    from: '',
    subj: '',
    message: '',
  })
  url = 'https://purple-test.free.beeceptor.com';
  status = EStatus.NONE;
  error_msg = "";
  exportStatus = EStatus;
  id: string = "";
  selectedNewsStory$ = this.store.pipe(select(selectTemplate));
  selectedNews: ISimpleTemplate = {
    subject: '',
    body: ''
  };
  @ViewChild(TemplateEditorComponent) editor: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    public router: Router
  ) {
    this.selectedNewsStory$.subscribe((data) => {
      if (data !== null) {
        this.selectedNews = data;

        this.emailForm.setValue({
          ...this.emailForm.value,
          subj: data.subject,
          message: data.body
        })
      }
    })
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
  }

  onSubmit(): void {
    console.log(this.emailForm.value);
    var val = this.emailForm.value;
    var templateClass: ITemplateData = {
      template_id: 1,
      elected_officials: null,
      to: val.to,
      from: val.from,
      subject: val.subj,
      body: this.editor.htmlContent
    }

    this.store.dispatch(new UpdateTemplate(
      {
        subject: val.subj,
        body: this.editor.htmlContent
      }
    ))

    console.log(templateClass.body);
    // this.http.post<IResponse>(this.url, JSON.stringify(templateClass))
    //   .subscribe((data) => {
    //     this.status = data.success ? EStatus.SUCCESS : EStatus.FAILURE;
    //     this.error_msg = data.error_msg;
    //   });

  }

  backToNews() {
    var val = this.emailForm.value;
    this.store.dispatch(new UpdateTemplate(
      {
        subject: val.subj,
        body: this.editor.htmlContent
      }
    ));

    this.router.navigate(['/local-issues'])
  }
}

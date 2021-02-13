import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { EStatus, IResponse } from '../models/status';

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


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.emailForm.value);
    this.http.post<IResponse>(this.url, JSON.stringify(this.emailForm.value))
      .subscribe((data) => {
        this.status = data.success ? EStatus.SUCCESS : EStatus.FAILURE;
        this.error_msg = data.error_msg;
      });
  }
}

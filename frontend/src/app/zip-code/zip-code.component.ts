import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EStatus, IResponse } from '../models/status';

@Component({
  selector: 'app-zip-code',
  templateUrl: './zip-code.component.html',
  styleUrls: ['./zip-code.component.css']
})
export class ZipCodeComponent implements OnInit {
  zipForm = this.formBuilder.group({
    zip: ''
  })
  url = 'http://34.71.67.202/api/zipcode/';
  status = EStatus.NONE;
  error_msg = "";
  exportStatus = EStatus;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.zipForm.value);
    
    this.http.post<IResponse>(this.url, this.zipForm.value)
      .subscribe((data) => {
        this.status = data.success ? EStatus.SUCCESS : EStatus.FAILURE;
        if (this.status == EStatus.SUCCESS) {
          console.log("Success")
          this.router.navigate(['/local-issues']);
        } else {
          this.error_msg = data.error_msg;
        }
      })
    // this.router.navigate(['/local-issues']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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


  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    console.log(this.emailForm.value);
  }
}

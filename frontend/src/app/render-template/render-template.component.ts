import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INewsStoriesValued } from '../models/officials';
import { ISimpleTemplate } from '../models/template-data';
import { GetTemplateService } from '../service/get-template.service';
import { IAppState } from '../store/state/app.state';

@Component({
  selector: 'app-render-template',
  templateUrl: './render-template.component.html',
  styleUrls: ['./render-template.component.css']
})
export class RenderTemplateComponent implements OnInit {
  news_articles_vals: INewsStoriesValued[] | null = null;

  constructor(
    private getTemplate: GetTemplateService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getTemplate.getTemplate()
      .subscribe((template: ISimpleTemplate) => {
        console.log(template);
      })
  }

}

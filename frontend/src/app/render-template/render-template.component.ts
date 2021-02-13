import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { INewsStoriesValued } from '../models/officials';
import { ISimpleTemplate } from '../models/template-data';
import { GetTemplateService } from '../service/get-template.service';
import { UpdateTemplate } from '../store/actions/data.actions';
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
    private router: Router,
    private store: Store<IAppState>
  ) {
  }

  ngOnInit(): void {
    this.getTemplate.getTemplate()
      .subscribe((template: ISimpleTemplate) => {
        this.store.dispatch(new UpdateTemplate({
          subject: template.subject,
          body: template.body
        }))
      })
  }

}

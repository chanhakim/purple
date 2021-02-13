import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import { IDifferentIssues, INewsStoriesValued } from '../models/officials';
import { GetNewsService } from '../service/get-news.service';

@Component({
  selector: 'app-local-issues',
  templateUrl: './local-issues.component.html',
  styleUrls: ['./local-issues.component.css']
})
export class LocalIssuesComponent implements OnInit {
  news_articles_vals: INewsStoriesValued[] | null = null;

  constructor(
    private newsfeed: GetNewsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newsfeed.getNews()
      .subscribe((news: IDifferentIssues) => {
        // this.news_articles_vals = news.newstories
        this.news_articles_vals = news.newstories.map((story) => {
          return {
            ...story,
            uuid: this.getUUID()
          }
        })
      });
  }

  getUUID(): string {
    return uuidv4();
  }

  writeSenator(id: string): void {
    this.router.navigate(['/template', this.getUUID()]);

  }
}

import { Component, OnInit } from '@angular/core';
import { IDifferentIssues, INewsStories, INewsStoriesKV } from '../models/officials';
import { GetNewsService } from '../service/get-news.service';

@Component({
  selector: 'app-local-issues',
  templateUrl: './local-issues.component.html',
  styleUrls: ['./local-issues.component.css']
})
export class LocalIssuesComponent implements OnInit {
  news_articles_vals: INewsStories[] | null = null;

  constructor(
    private newsfeed: GetNewsService
  ) { }

  ngOnInit(): void {
    this.newsfeed.getNews()
      .subscribe((news: IDifferentIssues) => this.news_articles_vals = Object.values(news.newstories));
  }
}

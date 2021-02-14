import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Store, select } from '@ngrx/store';

import { IDifferentIssues, INewsStoriesValued, INewsStories } from '../models/officials';
import { GetNewsService } from '../service/get-news.service';
import { IAppState } from '../store/state/app.state';
import { AddSingleStory, SelectedNews, UpdateTemplate } from '../store/actions/data.actions';
import { selectNews } from '../store/selectors/data.selectors';

@Component({
  selector: 'app-local-issues',
  templateUrl: './local-issues.component.html',
  styleUrls: ['./local-issues.component.css']
})
export class LocalIssuesComponent implements OnInit {
  news_articles_vals: INewsStoriesValued[] | null = null;
  selectedNewsStory$ = this.store.pipe(select(selectNews));
  selectedNews: INewsStoriesValued | null = null;

  constructor(
    private newsfeed: GetNewsService,
    public router: Router,
    private store: Store<IAppState>
  ) {
    this.selectedNewsStory$.subscribe((data) => {
      this.selectedNews = data;
    })
  }

  ngOnInit(): void {
    this.newsfeed.getNews()
      .subscribe((news: INewsStories[]) => {
        // this.news_articles_vals = news.newstories
        console.log(news);
        this.news_articles_vals = []
        for (const [storyKey, storyVal] of Object.entries(news)) {
          let article: INewsStoriesValued = {
            ...storyVal,
            uuid: this.getUUID()
          };

          this.store.dispatch(new AddSingleStory(
            article
          ));

          this.news_articles_vals?.push(article);
        }
      });
  }

  getUUID(): string {
    return uuidv4();
  }

  writeSenator(id: string, article: INewsStoriesValued): void {
    this.store.dispatch(new SelectedNews(
      article
    ));
    this.store.dispatch(new UpdateTemplate(
      {
        to: ["email1", "email2"],
        from: "myemail",
        template_id: "",
        subject: article.headline,
        body: `
        <font face="Arial">
        <p>Dear [Insert Elected Offical Title &amp; Name],</p>
        <p>My name is [Insert First &amp; Last Name] and I am one of your constituents.
        I am writing you about the issue of [Insert Issue]. I strongly believe [Insert
        Stance] about this issue for the following reasons:</p>
        <ul>
        <li>[Insert Reason 1]</li>
        <li>[Insert Reason 2]</li>
        <li>[Insert Reason 3]</li>
        </ul>
        <p>This issue matters to our community and state. [Insert Personal Story, if You Have One] I hope that my points above will persuade you to [Insert Action].&nbsp;</p>
        <p style="text-align: right;">Sincerely,</p>
        <p style="text-align: right;">[Insert Name]&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        </font>
        `
      }
    ))
    this.router.navigate(['/template', id]);
  }

  contWriting(): void {
    if (this.selectedNews !== null) {
      this.router.navigate(['/template', this.selectedNews.uuid]);
    }
  }
}

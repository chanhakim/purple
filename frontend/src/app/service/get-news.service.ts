import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { IDifferentIssues } from '../models/officials';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetNewsService {
  baseUrl: string = 'assets/'

  constructor(
    private http: HttpClient
  ) { }

  getNews() : Observable<IDifferentIssues> {
      return this.http.get<IDifferentIssues>(this.baseUrl + 'news.json')
        .pipe(
          catchError(this.handleError)
        )
  }

  private handleError(error: any) {
    console.error('server error:', error);
      if (error.error instanceof Error) {
          const errMessage = error.error.message;
          return Observable.throw(errMessage);
      }
      return Observable.throw(error || 'Node.js server error');
  }
}

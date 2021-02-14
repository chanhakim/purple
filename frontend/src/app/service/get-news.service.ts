import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { IDifferentIssues, INewsStories } from '../models/officials';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetNewsService {
  baseUrl: string = ' http://34.71.67.202/api/news'

  constructor(
    private http: HttpClient
  ) { }

  getNews(): Observable<INewsStories[]> {
    return this.http.get<INewsStories[]>(this.baseUrl)
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

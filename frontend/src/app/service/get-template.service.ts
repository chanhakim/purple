import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITemplateData } from '../models/template-data';

@Injectable({
  providedIn: 'root'
})
export class GetTemplateService {
  baseUrl: string = 'http://localhost:3000/api/single_template/'
  constructor(
    private http: HttpClient
  ) { }

  getTemplate(): Observable<ITemplateData> {
    let id = "123"
    return this.http.get<ITemplateData>(this.baseUrl + id)
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

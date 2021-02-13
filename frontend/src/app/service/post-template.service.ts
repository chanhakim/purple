import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operator';

@Injectable({
  providedIn: 'root'
})
export class PostTemplateService {
  url = 'https://purple-test.free.beeceptor.com'


  constructor(private http: HttpClient) {

  }
}

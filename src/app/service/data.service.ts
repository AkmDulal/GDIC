import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject, interval, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpHeader: any;
  getUrl = environment.API_URL;
  environmentObj = environment;
  httpDataHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  httpFormDataHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor(private https: HttpClient, public auth: AuthService, private router: Router) {}
  getJson(path: string, query: string): Observable<any> {
    return this.https.get(this.getUrl + path + query, this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(`${error.error}`);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Contact } from './contact';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  constructor(private http: HttpClient) {}

  /** Post contact to the server */
  submitContact (contact: Contact): Observable<Contact> {
    return this.http.post<Contact>('/api/contact/submit', contact, httpOptions).pipe(
        tap((newContact: Contact) => this.log(`submitted contact w/ id=${newContact._id.toString()}`)),
        catchError(this.handleError<Contact>('submitContact'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.log(`${error.message}`); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ContactService  message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    console.log(`Message: ${message}`);
    // console.log('Log Service Fired');
  }
}

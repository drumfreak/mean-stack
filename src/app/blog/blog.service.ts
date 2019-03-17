import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Blog } from './blog';
import {Weather} from '../weather/weather';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient) {}

  /** GET blogs from the server */

  getBlogs (page): Observable<Blog[]> {
    return this.http.get<Blog[]>('/api/blog/list/' + page)
        .pipe(
            tap(_ => this.log('fetched blog list')),
            catchError(this.handleError('getBlogs', []))
        );
  }


  getBlog (blogId): Observable<{}> {
    return this.http.get<Blog>('/api/blog/' + blogId)
        .pipe(
            tap(_ => this.log('fetched getBlog')),
            catchError(this.handleError('getBlog', []))
        );
  }

  /** Post contact to the server */
  createBlog (blog: Blog): Observable<Blog> {
    return this.http.post<Blog>('/api/blog/submit', blog, httpOptions).pipe(
        tap((newBlog: Blog) => this.log(`submitted blog w/ id=${newBlog._id.toString()}`)),
        catchError(this.handleError<Blog>('createBlog'))
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

  /** Log a BlogService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    // console.log(`Message: ${message}`);
    // console.log('Log Service Fired');
  }
}

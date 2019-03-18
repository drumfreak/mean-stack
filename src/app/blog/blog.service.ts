import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BlogResults } from './blog';
import { Blog } from './blog';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient) {}

  /** GET blogs from the server */
  getBlogs (page, limit): Observable<{}> {
    return this.http.get<BlogResults>('/api/blog/list/' + page + '/' + limit)
        .pipe(
            tap(_ => this.log('fetched blog list')),
            catchError(this.handleError('getBlogs', []))
        );
  }

  /** GET blog with ID from the server */
  getBlog (blogId): Observable<{}> {
    return this.http.get<Blog>('/api/blog/' + blogId)
        .pipe(
            tap(_ => this.log('fetched getBlog')),
            catchError(this.handleError('getBlog', []))
        );
  }

  /** Post blog to the server */
  createBlog (blog: Blog): Observable<Blog> {
    return this.http.post<Blog>('/api/blog/submit', blog, httpOptions).pipe(
        tap((newBlog: Blog) => this.log(`submitted blog w/ id=${newBlog._id.toString()}`)),
        catchError(this.handleError<Blog>('createBlog'))
    );
  }


  /** Post contact to the server */
  updateBlog (blog: Blog): Observable<Blog> {
    return this.http.post<Blog>('/api/blog/update', blog, httpOptions).pipe(
        tap((newBlog: Blog) => this.log(`submitted blog w/ id=${newBlog._id.toString()}`)),
        catchError(this.handleError<Blog>('updateBlog'))
    );
  }

  deleteBlog (blogId): Observable<{}> {
    return this.http.get<Blog>('/api/blog/delete/' + blogId)
        .pipe(
            tap(_ => this.log('fetched deleteBlog')),
            catchError(this.handleError('deleteBlog', []))
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

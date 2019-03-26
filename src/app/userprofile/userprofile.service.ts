import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Userprofile} from './userprofile';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})

export class UserprofileService {

    constructor(private http: HttpClient) {}

    /** GET user profiles from the server */

    getUserProfile(userId): Observable<{}> {
        return this.http.get<Userprofile>('/api/userprofile/' + userId)
            .pipe(
                tap(_ => this.log('fetched userProfile')),
                catchError(this.handleError('getWeather', []))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            // console.log(`${error.message}`); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Post user profile updates to the server */
    updateProfile(profile: Userprofile): Observable<Userprofile> {
        return this.http.post<Userprofile>('/api/userprofile/update', profile, httpOptions).pipe(
            tap((newProfile: Userprofile) => this.log(`submitted user profile updates w/ id=${newProfile._id.toString()}`)),
            catchError(this.handleError<Userprofile>('updateBlog'))
        );
    }

    /** Log a message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`UserProfileService: ${message}`);
        console.log(`Message: ${message}`);
        // console.log('Log Service Fired');
    }
}

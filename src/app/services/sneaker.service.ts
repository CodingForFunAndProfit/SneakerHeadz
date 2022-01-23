import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Sneaker } from '../entities/sneaker';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class SneakerService {
  private sneakersUrl = 'api/sneakers';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET sneaker from the server */
  getSneakers(): Observable<Sneaker[]> {
    return this.http.get<Sneaker[]>(this.sneakersUrl).pipe(
      tap((_) => this.log('fetched sneakers')),
      catchError(this.handleError<Sneaker[]>('getSneakers', []))
    );
  }

  /** GET sneaker by id. Return `undefined` when id not found */
  getSneakerNo404<Data>(id: number): Observable<Sneaker> {
    const url = `${this.sneakersUrl}/?id=${id}`;
    return this.http.get<Sneaker[]>(url).pipe(
      map((sneakers) => sneakers[0]), // returns a {0|1} element array
      tap((s) => {
        const outcome = s ? `fetched` : `did not find`;
        this.log(`${outcome} sneaker id=${id}`);
      }),
      catchError(this.handleError<Sneaker>(`getSneaker id=${id}`))
    );
  }

  /** GET sneaker by id. Will 404 if id not found */
  getSneaker(id: number): Observable<Sneaker> {
    const url = `${this.sneakersUrl}/${id}`;
    return this.http.get<Sneaker>(url).pipe(
      tap((_) => this.log(`fetched sneaker id=${id}`)),
      catchError(this.handleError<Sneaker>(`getSneaker id=${id}`))
    );
  }

  /* GET sneakers whose name contains search term */
  searchSneakers(term: string): Observable<Sneaker[]> {
    if (!term.trim()) {
      // if not search term, return empty sneaker array.
      return of([]);
    }
    return this.http.get<Sneaker[]>(`${this.sneakersUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found sneakers matching "${term}"`)
          : this.log(`no sneakers matching "${term}"`)
      ),
      catchError(this.handleError<Sneaker[]>('searchSneakers', []))
    );
  }

  /** POST: add a new sneaker to the server */
  addSneaker(sneaker: Sneaker): Observable<Sneaker> {
    return this.http
      .post<Sneaker>(this.sneakersUrl, sneaker, this.httpOptions)
      .pipe(
        tap((newSneaker: Sneaker) =>
          this.log(`added sneaker w/ id=${newSneaker.id}`)
        ),
        catchError(this.handleError<Sneaker>('addSneaker'))
      );
  }

  /** DELETE: delete the sneaker from the server */
  deleteSneaker(id: number): Observable<Sneaker> {
    const url = `${this.sneakersUrl}/${id}`;

    return this.http.delete<Sneaker>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted sneaker id=${id}`)),
      catchError(this.handleError<Sneaker>('deleteSneaker'))
    );
  }

  /** PUT: update the sneaker on the server */
  updateSneaker(sneaker: Sneaker): Observable<any> {
    return this.http.put(this.sneakersUrl, sneaker, this.httpOptions).pipe(
      tap((_) => this.log(`updated sneaker id=${sneaker.id}`)),
      catchError(this.handleError<any>('updateSneaker'))
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
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`SneakerService: ${message}`);
  }
}

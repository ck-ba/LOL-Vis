import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../global/globals';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {LocationList, LocationListAdapter} from "../dto/locationList";

@Injectable({
  providedIn: 'root'
})
export class MultimatchService {

  private messageBaseUri: string = this.globals.backendUri + 'matches';

  constructor(private httpClient: HttpClient, private globals: Globals, private adapter: LocationListAdapter) {
  }

  /** GET matches matching certain search terms
   * blabla
   */
  getMatches(player: string, champion: string): Observable<LocationList[]> {
    return this.httpClient.get<LocationList[]>(`${this.messageBaseUri}?player=${player}&champion=${champion}`).pipe(
      tap(x => x.length ?
        console.log(`found stuff`) :
        console.log(`no nothing`)), map((data: any[]) => data.map(item => this.adapter.adapt(item))),
      catchError(this.handleError<LocationList[]>('searchOwners', []))
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
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

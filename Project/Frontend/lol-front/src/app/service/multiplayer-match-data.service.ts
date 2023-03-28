import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../global/globals';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {LocationList, LocationListAdapter} from "../dto/locationList";
import {MatchData, MatchDataAdapter} from "../dto/matchData";

@Injectable({
  providedIn: 'root'
})
export class MultiplayerMatchDataService {

  private messageBaseUri: string = this.globals.backendUri + 'randomatch';

  constructor(private httpClient: HttpClient, private globals: Globals, private adapter: MatchDataAdapter) {
  }

  /** GET matches that match certain search terms
   *  matches should be with certain champion and team and result, + number of randomized matches
   */
  getAllMatchesWithTypeAndTeamAndResult(type: string, team: string, result: string, length: string): Observable<MatchData[]> {
    return this.httpClient.get<MatchData[]>(`${this.messageBaseUri}/${type}/${team}/${result}/${length}`).pipe(
      tap(x => x.length ?
        console.log(`found matches matching query`) :
        console.log(`no matches matching query`)), map((data: any[]) => data.map(item => this.adapter.adapt(item))),
      catchError(this.handleError<MatchData[]>('getAllMatches', []))
    );
  }



  /** GET matches that match certain search terms
   *
   */
  getAllMatches(): Observable<MatchData[]> {
    return this.httpClient.get<MatchData[]>(`${this.messageBaseUri}`).pipe(
      tap(x => x.length ?
        console.log(`found matches matching query`) :
        console.log(`no matches matching query`)), map((data: any[]) => data.map(item => this.adapter.adapt(item))),
      catchError(this.handleError<MatchData[]>('getAllMatches', []))
    );
  }

  /** GET matches that match certain search terms
   *  matches should be with certain player and champion and team
   */
  getAllMatchesWithTeam(player: string, champion: string, team: string): Observable<MatchData[]> {
    return this.httpClient.get<MatchData[]>(`${this.messageBaseUri}/${player}/${champion}/${team}`).pipe(
      tap(x => x.length ?
        console.log(`found matches matching query`) :
        console.log(`no matches matching query`)), map((data: any[]) => data.map(item => this.adapter.adapt(item))),
      catchError(this.handleError<MatchData[]>('getAllMatches', []))
    );
  }


  /** GET matches that match certain search terms
   *  matches should be with certain player and position and team and result
   */
  getAllMatchesWithPositionWithTeamAndResult(player: string, pool: string, position: string, team: string, result: string): Observable<MatchData[]> {
    return this.httpClient.get<MatchData[]>(`${this.messageBaseUri}/${player}/${pool}/${position}/${team}/${result}`).pipe(
      tap(x => x.length ?
        console.log(`found matches matching query`) :
        console.log(`no matches matching query`)), map((data: any[]) => data.map(item => this.adapter.adapt(item))),
      catchError(this.handleError<MatchData[]>('getAllMatches', []))
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

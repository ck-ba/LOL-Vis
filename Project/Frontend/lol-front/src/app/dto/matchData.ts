import {Injectable} from '@angular/core';
import {Adapter} from '../adapter/adapter.component';
import {TeamMatchDetails} from "./teamMatchDetails";

export class MatchData {
  constructor(
    public winner: String,
    public date: String,
    public id: number,
    public teamBlue: TeamMatchDetails,
    public teamRed: TeamMatchDetails,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class MatchDataAdapter implements Adapter<MatchData> {
  adapt(item:any): MatchData {
    return new MatchData(
      item.winner,
      item.date,
      item.id,
      item.teamBlue,
      item.teamRed,
    );
  }
}

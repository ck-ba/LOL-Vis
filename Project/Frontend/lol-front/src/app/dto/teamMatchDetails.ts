import {Injectable} from '@angular/core';
import {Adapter} from '../adapter/adapter.component';
import {ChampionMatchDetails} from "./championMatchDetails";

export class TeamMatchDetails {
  constructor(
    public winner: boolean,
    public champions: ChampionMatchDetails[],
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class TeamMatchDetailsAdapter implements Adapter<TeamMatchDetails> {
  adapt(item:any): TeamMatchDetails {
    return new TeamMatchDetails(
      item.winner,
      item.champions,
    );
  }
}

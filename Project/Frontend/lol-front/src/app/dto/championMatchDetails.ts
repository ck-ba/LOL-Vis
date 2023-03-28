import {Injectable} from '@angular/core';
import {Adapter} from '../adapter/adapter.component';
import {LocationData} from "./locationData";

export class ChampionMatchDetails {
  constructor(
    public name: String,
    public player: String,
    public killCount: number,
    public deathCount: number,
    public assistCount: number,
    public positions: LocationData[],
    public deaths: LocationData[],
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChampionMatchDetailsAdapter implements Adapter<ChampionMatchDetails> {
  adapt(item:any): ChampionMatchDetails {
    return new ChampionMatchDetails(
      item.name,
      item.player,
      item.killCount,
      item.deathCount,
      item.assistCount,
      item.positions,
      item.deaths,
    );
  }
}

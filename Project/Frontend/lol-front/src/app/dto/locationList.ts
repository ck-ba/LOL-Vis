import {Injectable} from '@angular/core';
import {Adapter} from '../adapter/adapter.component';

export class LocationList {
  constructor(
    public x: number,
    public y: number,
    ) {}
}

@Injectable({
  providedIn: 'root'
})
export class LocationListAdapter implements Adapter<LocationList> {
  adapt(item:any): LocationList {
    return new LocationList(
      item.x,
      item.y,
    );
  }
}

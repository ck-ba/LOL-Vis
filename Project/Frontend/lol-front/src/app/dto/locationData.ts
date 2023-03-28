import {Injectable} from '@angular/core';
import {Adapter} from '../adapter/adapter.component';

export class LocationData {
  constructor(
    public x: number,
    public y: number,
    public time: number,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class LocationDataAdapter implements Adapter<LocationData> {
  adapt(item:any): LocationData {
    return new LocationData(
      item.x,
      item.y,
      item.number,
    );
  }
}

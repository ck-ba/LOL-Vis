import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adapter',
  templateUrl: './adapter.component.html',
  styleUrls: ['./adapter.component.scss']
})
export class AdapterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Adapter<T> {
  adapt(item: any): T;
}

import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatchData} from "../../../../../dto/matchData";
import {LocationList} from "../../../../../dto/locationList";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import * as d3 from "d3";

@Component({
  selector: 'app-heatmap-animation-fine',
  templateUrl: './heatmap-animation-fine.component.html',
  styleUrls: ['./heatmap-animation-fine.component.css']
})
export class HeatmapAnimationFineComponent implements OnInit {

  // @ts-ignore
  @Input() matchData: MatchData[];
  // @ts-ignore
  @Input() team: String;
  // @ts-ignore
  @Input() player: String;
  // @ts-ignore
  @ViewChild('chartEl') svgElement: ElementRef;

  // @ts-ignore
  private matchlist: MatchData[];
  // @ts-ignore
  private svg;
  // @ts-ignore
  private color;
  // @ts-ignore
  private locationList: LocationList[];
  // @ts-ignore
  private mins01: LocationList[];
  // @ts-ignore
  private mins02: LocationList[];
  // @ts-ignore
  private mins03: LocationList[];
  // @ts-ignore
  private mins04: LocationList[];
  // @ts-ignore
  private mins05: LocationList[];
  // @ts-ignore
  private mins06: LocationList[];
  // @ts-ignore
  private mins07: LocationList[];
  // @ts-ignore
  private mins08: LocationList[];
  // @ts-ignore
  private mins09: LocationList[];
  // @ts-ignore
  private mins10: LocationList[];
  // @ts-ignore
  private mins11: LocationList[];
  // @ts-ignore
  private mins12: LocationList[];
  // @ts-ignore
  private mins13: LocationList[];
  // @ts-ignore
  private mins14: LocationList[];
  // @ts-ignore
  private mins15: LocationList[];
  // @ts-ignore
  private mins16: LocationList[];
  // @ts-ignore
  private mins17: LocationList[];
  // @ts-ignore
  private mins18: LocationList[];
  // @ts-ignore
  private mins19: LocationList[];
  // @ts-ignore
  private mins20: LocationList[];
  // @ts-ignore
  private mins21: LocationList[];
  // @ts-ignore
  private mins22: LocationList[];
  // @ts-ignore
  private mins23: LocationList[];
  // @ts-ignore
  private mins24: LocationList[];
  // @ts-ignore
  private mins25: LocationList[];
  // @ts-ignore
  private mins26: LocationList[];
  // @ts-ignore
  private mins27: LocationList[];
  // @ts-ignore
  private mins28: LocationList[];
  // @ts-ignore
  private mins29: LocationList[];
  // @ts-ignore
  private mins30: LocationList[];
  // @ts-ignore
  private mins31: LocationList[];
  // @ts-ignore
  private mins32: LocationList[];
  // @ts-ignore
  private mins33: LocationList[];
  // @ts-ignore
  private mins34: LocationList[];
  // @ts-ignore
  private mins35: LocationList[];
  // @ts-ignore
  private mins36: LocationList[];
  // @ts-ignore
  private mins37: LocationList[];
  // @ts-ignore
  private mins38: LocationList[];
  // @ts-ignore
  private mins39: LocationList[];
  // @ts-ignore
  private mins40: LocationList[];
  // @ts-ignore
  private mins40plus: LocationList[];
  // @ts-ignore
  private wholeGame: LocationList[];

  private colors: any;
  // @ts-ignore
  private colorLow: any;
  // @ts-ignore
  private colorHigh: any;
  private margin = 50;
  private width = 600 - (this.margin * 2);
  private height = 600 - (this.margin * 2);

  private bandwidth = 7;

  chosenTime = 42;

  slider = new FormGroup({
    time: new FormControl(42),
  });

  speedSlider = new FormGroup({
    speed: new FormControl(500),
  });

  timerSubscription: Observable<unknown> | undefined;

  constructor() { }

  ngOnInit(): void {
    this.matchlist = this.matchData;
    if (this.player === "all") {
      this.prepareData();
    } else {
      this.prepareDataOfPlayer(this.player);
    }
    this.determineBandwidth();
    this.determineColors();

  }

  ngAfterViewInit() {
    this.createSvg();
    this.createColorRange();
    this.drawPlot();
  }

  gameTime: number = 42;
  // @ts-ignore
  interval: NodeJS.Timeout | undefined;
  speed: number = 500;

  startPlaying() {
    this.interval = setInterval(() => {
      if(this.gameTime <= 42) {
        this.slider.patchValue({
          time: this.gameTime,
        });
        this.updateTimeSlice();
        this.gameTime+=1;
      } else {
        this.gameTime = 1;
      }
    }, this.speed)
  }

  stopPlaying() {

    clearInterval(this.interval);
  }

  changeSpeed() {
    this.speed = 1010-this.speedSlider.get("speed")?.value;
    this.stopPlaying();
    this.startPlaying();
  }




  updateTimeSlice(): void {
    this.chosenTime = this.slider.get("time")?.value;
    this.gameTime = this.chosenTime;
    if (this.chosenTime == 42) {
      this.locationList = this.wholeGame;
    } else if (this.chosenTime == 41) {
      this.locationList = this.mins40plus
    } else if (this.chosenTime == 40) {
      this.locationList = this.mins40
    } else if (this.chosenTime == 39) {
      this.locationList = this.mins39
    } else if (this.chosenTime == 38) {
      this.locationList = this.mins38
    } else if (this.chosenTime == 37) {
      this.locationList = this.mins37
    } else if (this.chosenTime == 36) {
      this.locationList = this.mins36
    } else if (this.chosenTime == 35) {
      this.locationList = this.mins35
    } else if (this.chosenTime == 34) {
      this.locationList = this.mins34
    } else if (this.chosenTime == 33) {
      this.locationList = this.mins33
    } else if (this.chosenTime == 32) {
      this.locationList = this.mins32
    } else if (this.chosenTime == 31) {
      this.locationList = this.mins31
    } else if (this.chosenTime == 30) {
      this.locationList = this.mins30
    } else if (this.chosenTime == 29) {
      this.locationList = this.mins29
    } else if (this.chosenTime == 28) {
      this.locationList = this.mins28
    } else if (this.chosenTime == 27) {
      this.locationList = this.mins27
    } else if (this.chosenTime == 26) {
      this.locationList = this.mins26
    } else if (this.chosenTime == 25) {
      this.locationList = this.mins25
    } else if (this.chosenTime == 24) {
      this.locationList = this.mins24
    } else if (this.chosenTime == 23) {
      this.locationList = this.mins23
    } else if (this.chosenTime == 22) {
      this.locationList = this.mins22
    } else if (this.chosenTime == 21) {
      this.locationList = this.mins21
    } else if (this.chosenTime == 20) {
      this.locationList = this.mins20
    } else if (this.chosenTime == 19) {
      this.locationList = this.mins19
    } else if (this.chosenTime == 18) {
      this.locationList = this.mins18
    } else if (this.chosenTime == 17) {
      this.locationList = this.mins17
    } else if (this.chosenTime == 16) {
      this.locationList = this.mins16
    } else if (this.chosenTime == 15) {
      this.locationList = this.mins15
    } else if (this.chosenTime == 14) {
      this.locationList = this.mins14
    } else if (this.chosenTime == 13) {
      this.locationList = this.mins13
    } else if (this.chosenTime == 12) {
      this.locationList = this.mins12
    } else if (this.chosenTime == 11) {
      this.locationList = this.mins11
    } else if (this.chosenTime == 10) {
      this.locationList = this.mins10
    } else if (this.chosenTime == 9) {
      this.locationList = this.mins09
    } else if (this.chosenTime == 8) {
      this.locationList = this.mins08
    } else if (this.chosenTime == 7) {
      this.locationList = this.mins07
    } else if (this.chosenTime == 6) {
      this.locationList = this.mins06
    } else if (this.chosenTime == 5) {
      this.locationList = this.mins05
    } else if (this.chosenTime == 4) {
      this.locationList = this.mins04
    } else if (this.chosenTime == 3) {
      this.locationList = this.mins03
    } else if (this.chosenTime == 2) {
      this.locationList = this.mins01
    } else if (this.chosenTime == 1) {
      this.locationList = this.mins01
    } else {
      this.locationList = this.wholeGame;
    }
    this.determineBandwidth();
    this.updateChart();
  }

  private determineBandwidth(): void {
    if(this.locationList.length <= 5000) {
      this.bandwidth = 9;
    } else if (this.locationList.length <= 20000) {
      this.bandwidth = 8;
    } else if (this.locationList.length <= 30000) {
      this.bandwidth = 9;
    } else {
      this.bandwidth = 10;
    }
  }

  private determineColors(): void {
    if (this.team === "blue") {
      this.colorLow = "rgba(0,114,255,0.19)";
      this.colorHigh = "rgba(0,91,204,0.19)";
    } else if (this.team === "red") {
      this.colorLow = "rgba(255,0,72,0.19)";
      this.colorHigh = "rgba(194,0,57,0.19)";
    } else {
      this.colorLow = "rgba(136,31,255,0.19)";
      this.colorHigh = "rgba(91,0,190,0.19)";
    }
  }
  private prepareData(): void {
    let list: LocationList[] = [];
    let list01: LocationList[] = [];
    let list02: LocationList[] = [];
    let list03: LocationList[] = [];
    let list04: LocationList[] = [];
    let list05: LocationList[] = [];
    let list06: LocationList[] = [];
    let list07: LocationList[] = [];
    let list08: LocationList[] = [];
    let list09: LocationList[] = [];
    let list10: LocationList[] = [];
    let list11: LocationList[] = [];
    let list12: LocationList[] = [];
    let list13: LocationList[] = [];
    let list14: LocationList[] = [];
    let list15: LocationList[] = [];
    let list16: LocationList[] = [];
    let list17: LocationList[] = [];
    let list18: LocationList[] = [];
    let list19: LocationList[] = [];
    let list20: LocationList[] = [];
    let list21: LocationList[] = [];
    let list22: LocationList[] = [];
    let list23: LocationList[] = [];
    let list24: LocationList[] = [];
    let list25: LocationList[] = [];
    let list26: LocationList[] = [];
    let list27: LocationList[] = [];
    let list28: LocationList[] = [];
    let list29: LocationList[] = [];
    let list30: LocationList[] = [];
    let list31: LocationList[] = [];
    let list32: LocationList[] = [];
    let list33: LocationList[] = [];
    let list34: LocationList[] = [];
    let list35: LocationList[] = [];
    let list36: LocationList[] = [];
    let list37: LocationList[] = [];
    let list38: LocationList[] = [];
    let list39: LocationList[] = [];
    let list40: LocationList[] = [];
    let listLate: LocationList[] = [];
    // @ts-ignore
    this.matchlist.forEach((match) => {
      if (this.team === "blue" || this.team === "both") {
        match.teamBlue.champions.forEach((champion) => {
          champion.positions.forEach((pos) => {
            if (pos.time/1000/60 <= 1) {
              list01.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 2) {
              list02.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 3) {
              list03.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 4) {
              list04.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 5) {
              list05.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 6) {
              list06.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 7) {
              list07.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 8) {
              list08.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 9) {
              list09.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 10) {
              list10.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 11) {
              list11.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 12) {
              list12.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 13) {
              list13.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 14) {
              list14.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 15) {
              list15.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 16) {
              list16.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 17) {
              list17.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 18) {
              list18.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 19) {
              list19.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 20) {
              list20.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 21) {
              list21.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 22) {
              list22.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 23) {
              list23.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 24) {
              list24.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 25) {
              list25.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 26) {
              list26.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 27) {
              list27.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 28) {
              list28.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 29) {
              list29.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 30) {
              list30.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 31) {
              list31.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 32) {
              list32.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 33) {
              list33.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 34) {
              list34.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 35) {
              list35.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 36) {
              list36.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 37) {
              list37.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 38) {
              list38.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 39) {
              list39.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 40) {
              list40.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else {
              listLate.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            }
          });
        });
      }
      if (this.team === "red" || this.team === "both") {
        match.teamRed.champions.forEach((champion) => {
          champion.positions.forEach((pos) => {
            if (pos.time/1000/60 <= 1) {
              list01.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 2) {
              list02.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 3) {
              list03.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 4) {
              list04.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 5) {
              list05.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 6) {
              list06.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 7) {
              list07.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 8) {
              list08.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 9) {
              list09.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 10) {
              list10.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 11) {
              list11.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 12) {
              list12.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 13) {
              list13.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 14) {
              list14.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 15) {
              list15.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 16) {
              list16.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 17) {
              list17.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 18) {
              list18.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 19) {
              list19.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 20) {
              list20.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 21) {
              list21.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 22) {
              list22.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 23) {
              list23.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 24) {
              list24.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 25) {
              list25.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 26) {
              list26.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 27) {
              list27.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 28) {
              list28.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 29) {
              list29.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 30) {
              list30.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 31) {
              list31.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 32) {
              list32.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 33) {
              list33.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 34) {
              list34.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 35) {
              list35.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 36) {
              list36.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 37) {
              list37.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 38) {
              list38.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 39) {
              list39.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 40) {
              list40.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else {
              listLate.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            }
          });
        });
      }

    });
    this.mins01 = list01;
    this.mins02 = list02;
    this.mins03 = list03;
    this.mins04 = list04;
    this.mins05 = list05;
    this.mins06 = list06;
    this.mins07 = list07;
    this.mins08 = list08;
    this.mins09 = list09;
    this.mins10 = list10;
    this.mins11 = list11;
    this.mins12 = list12;
    this.mins13 = list13;
    this.mins14 = list14;
    this.mins15 = list15;
    this.mins16 = list16;
    this.mins17 = list17;
    this.mins18 = list18;
    this.mins19 = list19;
    this.mins20 = list20;
    this.mins21 = list21;
    this.mins22 = list22;
    this.mins23 = list23;
    this.mins24 = list24;
    this.mins25 = list25;
    this.mins26 = list26;
    this.mins27 = list27;
    this.mins28 = list28;
    this.mins29 = list29;
    this.mins30 = list30;
    this.mins31 = list31;
    this.mins32 = list32;
    this.mins33 = list33;
    this.mins34 = list34;
    this.mins35 = list35;
    this.mins36 = list36;
    this.mins37 = list37;
    this.mins38 = list38;
    this.mins39 = list39;
    this.mins40 = list40;
    this.mins40plus = listLate;
    this.wholeGame = list;
    this.locationList = this.wholeGame;
  }

  private prepareDataOfPlayer(playerName: String): void {
    let list: LocationList[] = [];
    let list01: LocationList[] = [];
    let list02: LocationList[] = [];
    let list03: LocationList[] = [];
    let list04: LocationList[] = [];
    let list05: LocationList[] = [];
    let list06: LocationList[] = [];
    let list07: LocationList[] = [];
    let list08: LocationList[] = [];
    let list09: LocationList[] = [];
    let list10: LocationList[] = [];
    let list11: LocationList[] = [];
    let list12: LocationList[] = [];
    let list13: LocationList[] = [];
    let list14: LocationList[] = [];
    let list15: LocationList[] = [];
    let list16: LocationList[] = [];
    let list17: LocationList[] = [];
    let list18: LocationList[] = [];
    let list19: LocationList[] = [];
    let list20: LocationList[] = [];
    let list21: LocationList[] = [];
    let list22: LocationList[] = [];
    let list23: LocationList[] = [];
    let list24: LocationList[] = [];
    let list25: LocationList[] = [];
    let list26: LocationList[] = [];
    let list27: LocationList[] = [];
    let list28: LocationList[] = [];
    let list29: LocationList[] = [];
    let list30: LocationList[] = [];
    let list31: LocationList[] = [];
    let list32: LocationList[] = [];
    let list33: LocationList[] = [];
    let list34: LocationList[] = [];
    let list35: LocationList[] = [];
    let list36: LocationList[] = [];
    let list37: LocationList[] = [];
    let list38: LocationList[] = [];
    let list39: LocationList[] = [];
    let list40: LocationList[] = [];
    let listLate: LocationList[] = [];
    // @ts-ignore
    this.matchlist.forEach((match) => {
      if (this.team === "blue" || this.team === "both") {
        match.teamBlue.champions.forEach((champion) => {
          if (champion.player === playerName) {
            champion.positions.forEach((pos) => {
              if (pos.time/1000/60 <= 1) {
                list01.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 2) {
                list02.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 3) {
                list03.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 4) {
                list04.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 5) {
                list05.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 6) {
                list06.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 7) {
                list07.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 8) {
                list08.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 9) {
                list09.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 10) {
                list10.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 11) {
                list11.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 12) {
                list12.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 13) {
                list13.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 14) {
                list14.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 15) {
                list15.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 16) {
                list16.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 17) {
                list17.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 18) {
                list18.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 19) {
                list19.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 20) {
                list20.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 21) {
                list21.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 22) {
                list22.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 23) {
                list23.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 24) {
                list24.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 25) {
                list25.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 26) {
                list26.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 27) {
                list27.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 28) {
                list28.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 29) {
                list29.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 30) {
                list30.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 31) {
                list31.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 32) {
                list32.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 33) {
                list33.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 34) {
                list34.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 35) {
                list35.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 36) {
                list36.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 37) {
                list37.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 38) {
                list38.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 39) {
                list39.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 40) {
                list40.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else {
                listLate.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              }
            });
          }
        });
      }
      if (this.team === "red" || this.team === "both") {
        match.teamRed.champions.forEach((champion) => {
          if (champion.player === playerName) {
            champion.positions.forEach((pos) => {
              if (pos.time/1000/60 <= 1) {
                list01.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 2) {
                list02.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 3) {
                list03.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 4) {
                list04.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 5) {
                list05.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 6) {
                list06.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 7) {
                list07.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 8) {
                list08.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 9) {
                list09.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 10) {
                list10.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 11) {
                list11.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 12) {
                list12.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 13) {
                list13.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 14) {
                list14.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 15) {
                list15.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 16) {
                list16.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 17) {
                list17.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 18) {
                list18.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 19) {
                list19.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 20) {
                list20.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 21) {
                list21.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 22) {
                list22.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 23) {
                list23.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 24) {
                list24.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 25) {
                list25.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 26) {
                list26.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 27) {
                list27.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 28) {
                list28.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 29) {
                list29.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 30) {
                list30.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 31) {
                list31.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 32) {
                list32.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 33) {
                list33.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 34) {
                list34.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 35) {
                list35.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 36) {
                list36.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 37) {
                list37.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 38) {
                list38.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 39) {
                list39.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 40) {
                list40.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else {
                listLate.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              }
            });
          }
        });
      }
    });
    this.mins01 = list01;
    this.mins02 = list02;
    this.mins03 = list03;
    this.mins04 = list04;
    this.mins05 = list05;
    this.mins06 = list06;
    this.mins07 = list07;
    this.mins08 = list08;
    this.mins09 = list09;
    this.mins10 = list10;
    this.mins11 = list11;
    this.mins12 = list12;
    this.mins13 = list13;
    this.mins14 = list14;
    this.mins15 = list15;
    this.mins16 = list16;
    this.mins17 = list17;
    this.mins18 = list18;
    this.mins19 = list19;
    this.mins20 = list20;
    this.mins21 = list21;
    this.mins22 = list22;
    this.mins23 = list23;
    this.mins24 = list24;
    this.mins25 = list25;
    this.mins26 = list26;
    this.mins27 = list27;
    this.mins28 = list28;
    this.mins29 = list29;
    this.mins30 = list30;
    this.mins31 = list31;
    this.mins32 = list32;
    this.mins33 = list33;
    this.mins34 = list34;
    this.mins35 = list35;
    this.mins36 = list36;
    this.mins37 = list37;
    this.mins38 = list38;
    this.mins39 = list39;
    this.mins40 = list40;
    this.mins40plus = listLate;
    this.wholeGame = list;
    this.locationList = this.wholeGame;
  }

  private createSvg(): void {
    this.svg = d3
      .select(this.svgElement.nativeElement)
      .append("svg")
      .attr("width", this.width )
      .attr("height", this.height )
    var imgs = this.svg
      .append("sgv:image")
      .attr( "xlink:href" , "https://i.ibb.co/dQwNDRB/mapnew.png")
      .attr("width", this.width)
      .attr("height", this.height)
  }

  private createColorRange(): void {
    // @ts-ignore
    this.colors = d3
      .scaleLinear()
      .domain([0, 1]) // Points per square pixel.
      // @ts-ignore
      .range([this.colorLow, this.colorHigh]);
  }

  private drawPlot(): void {
    // Add X axis
    const x = d3
      .scaleLinear()
      .domain([0, 15000])
      .range([ 0, this.width ]);
    this.svg.append("g")

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([15000, 0])
      .range([ 0, this.height]);
    this.svg.append("g")

    // compute the density data
    // @ts-ignore
    var densityData = d3.contourDensity()
      .x(d => {
        // @ts-ignore
        return x(d.x);
      })
      .y(d => {
        // @ts-ignore
        return y(d.y);
      })
      .size([this.width, this.height])
      // @ts-ignore
      .bandwidth(this.bandwidth)(this.locationList);

    // show the shape!
    this.svg
      .insert("g", "g")
      .selectAll("path")
      .data(densityData)
      .enter()
      .append("path")
      .attr("d", d3.geoPath())
      // @ts-ignore
      .attr("fill", d => {
        return this.colors(d.value);
      });


  }

  private updateChart(): void {
    d3.select(this.svgElement.nativeElement).selectAll("g > *").remove()

    const x = d3
      .scaleLinear()
      .domain([0, 15000])
      .range([ 0, this.width ]);
    this.svg.append("g")

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([15000, 0])
      .range([ 0, this.height]);
    this.svg.append("g")

    // compute the density data
    // @ts-ignore
    var densityData = d3.contourDensity()
      .x(d => {
        // @ts-ignore
        return x(d.x);
      })
      .y(d => {
        // @ts-ignore
        return y(d.y);
      })
      .size([this.width, this.height])
      // @ts-ignore
      .bandwidth(this.bandwidth)(this.locationList);

    // show the shape!
    this.svg
      .insert("g", "g")
      .selectAll("path")
      .data(densityData)
      .enter()
      .append("path")
      .attr("d", d3.geoPath())
      // @ts-ignore
      .attr("fill", d => {
        return this.colors(d.value);
      });
  }


}

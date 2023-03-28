import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatchData} from "../../../../../dto/matchData";
import {LocationList} from "../../../../../dto/locationList";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import * as d3 from "d3";

@Component({
  selector: 'app-matches-gametime-detail-animation-heat',
  templateUrl: './matches-gametime-detail-animation-heat.component.html',
  styleUrls: ['./matches-gametime-detail-animation-heat.component.css']
})
export class MatchesGametimeDetailAnimationHeatComponent implements OnInit {

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
  private mins00To02: LocationList[];
  // @ts-ignore
  private mins02To04: LocationList[];
  // @ts-ignore
  private mins04To06: LocationList[];
  // @ts-ignore
  private mins06To08: LocationList[];
  // @ts-ignore
  private mins08To10: LocationList[];
  // @ts-ignore
  private mins10To12: LocationList[];
  // @ts-ignore
  private mins12To14: LocationList[];
  // @ts-ignore
  private mins14To16: LocationList[];
  // @ts-ignore
  private mins16To18: LocationList[];
  // @ts-ignore
  private mins18To20: LocationList[];
  // @ts-ignore
  private mins20To22: LocationList[];
  // @ts-ignore
  private mins22To24: LocationList[];
  // @ts-ignore
  private mins24To26: LocationList[];
  // @ts-ignore
  private mins26To28: LocationList[];
  // @ts-ignore
  private mins28To30: LocationList[];
  // @ts-ignore
  private mins30To32: LocationList[];
  // @ts-ignore
  private mins32To34: LocationList[];
  // @ts-ignore
  private mins34To36: LocationList[];
  // @ts-ignore
  private mins36To38: LocationList[];
  // @ts-ignore
  private mins38To40: LocationList[];
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

  chosenTime = 44;

  slider = new FormGroup({
    time: new FormControl(44),
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

  gameTime: number = 44;
  // @ts-ignore
  interval: NodeJS.Timeout | undefined;
  play: boolean = false;

  startPlaying() {
    this.interval = setInterval(() => {
      if(this.gameTime <= 44) {
        this.slider.patchValue({
          time: this.gameTime,
        });
        this.updateTimeSlice();
        this.gameTime+=2;
      } else {
        this.gameTime = 2;
      }
    },800)
  }

  stopPlaying() {
    clearInterval(this.interval);
  }

  updateTimeSlice(): void {
    this.chosenTime = this.slider.get("time")?.value;
    this.gameTime = this.chosenTime;
    if (this.chosenTime == 44) {
      this.locationList = this.wholeGame;
    } else if (this.chosenTime == 42) {
      this.locationList = this.mins40plus
    } else if (this.chosenTime == 40) {
      this.locationList = this.mins38To40
    } else if (this.chosenTime == 38) {
      this.locationList = this.mins36To38
    } else if (this.chosenTime == 36) {
      this.locationList = this.mins34To36
    } else if (this.chosenTime == 34) {
      this.locationList = this.mins32To34
    } else if (this.chosenTime == 32) {
      this.locationList = this.mins30To32
    } else if (this.chosenTime == 30) {
      this.locationList = this.mins28To30
    } else if (this.chosenTime == 28) {
      this.locationList = this.mins26To28
    } else if (this.chosenTime == 26) {
      this.locationList = this.mins24To26
    } else if (this.chosenTime == 24) {
      this.locationList = this.mins22To24
    } else if (this.chosenTime == 22) {
      this.locationList = this.mins20To22
    } else if (this.chosenTime == 20) {
      this.locationList = this.mins18To20
    } else if (this.chosenTime == 18) {
      this.locationList = this.mins16To18
    } else if (this.chosenTime == 16) {
      this.locationList = this.mins14To16
    } else if (this.chosenTime == 14) {
      this.locationList = this.mins12To14
    } else if (this.chosenTime == 12) {
      this.locationList = this.mins10To12
    } else if (this.chosenTime == 10) {
      this.locationList = this.mins08To10
    } else if (this.chosenTime == 8) {
      this.locationList = this.mins06To08
    } else if (this.chosenTime == 6) {
      this.locationList = this.mins04To06
    } else if (this.chosenTime == 4) {
      this.locationList = this.mins02To04
    } else if (this.chosenTime == 2) {
      this.locationList = this.mins00To02
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
    let list02: LocationList[] = [];
    let list04: LocationList[] = [];
    let list06: LocationList[] = [];
    let list08: LocationList[] = [];
    let list10: LocationList[] = [];
    let list12: LocationList[] = [];
    let list14: LocationList[] = [];
    let list16: LocationList[] = [];
    let list18: LocationList[] = [];
    let list20: LocationList[] = [];
    let list22: LocationList[] = [];
    let list24: LocationList[] = [];
    let list26: LocationList[] = [];
    let list28: LocationList[] = [];
    let list30: LocationList[] = [];
    let list32: LocationList[] = [];
    let list34: LocationList[] = [];
    let list36: LocationList[] = [];
    let list38: LocationList[] = [];
    let list40: LocationList[] = [];
    let listLate: LocationList[] = [];
    // @ts-ignore
    this.matchlist.forEach((match) => {
      if (this.team === "blue" || this.team === "both") {
        match.teamBlue.champions.forEach((champion) => {
          champion.positions.forEach((pos) => {
            if (pos.time/1000/60 <= 2) {
              list02.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 4) {
              list04.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 6) {
              list06.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 8) {
              list08.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 10) {
              list10.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 12) {
              list12.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 14) {
              list14.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 16) {
              list16.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 18) {
              list18.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 20) {
              list20.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 22) {
              list22.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 24) {
              list24.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 26) {
              list26.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 28) {
              list28.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 30) {
              list30.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 32) {
              list32.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 34) {
              list34.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 36) {
              list36.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 38) {
              list38.push(new LocationList(pos.x, pos.y))
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
            if (pos.time/1000/60 <= 2) {
              list02.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 4) {
              list04.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 6) {
              list06.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 8) {
              list08.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 10) {
              list10.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 12) {
              list12.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 14) {
              list14.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 16) {
              list16.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 18) {
              list18.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 20) {
              list20.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 22) {
              list22.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 24) {
              list24.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 26) {
              list26.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 28) {
              list28.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 30) {
              list30.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 32) {
              list32.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 34) {
              list34.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 36) {
              list36.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 38) {
              list38.push(new LocationList(pos.x, pos.y))
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
    this.mins00To02 = list02;
    this.mins02To04 = list04;
    this.mins04To06 = list06;
    this.mins06To08 = list08;
    this.mins08To10 = list10;
    this.mins10To12 = list12;
    this.mins12To14 = list14;
    this.mins14To16 = list16;
    this.mins16To18 = list18;
    this.mins18To20 = list20;
    this.mins20To22 = list22;
    this.mins22To24 = list24;
    this.mins24To26 = list26;
    this.mins26To28 = list28;
    this.mins28To30 = list30;
    this.mins30To32 = list32;
    this.mins32To34 = list34;
    this.mins34To36 = list36;
    this.mins36To38 = list38;
    this.mins38To40 = list40;
    this.mins40plus = listLate;
    this.wholeGame = list;
    this.locationList = this.wholeGame;
  }

  private prepareDataOfPlayer(playerName: String): void {
    let list: LocationList[] = [];
    let list02: LocationList[] = [];
    let list04: LocationList[] = [];
    let list06: LocationList[] = [];
    let list08: LocationList[] = [];
    let list10: LocationList[] = [];
    let list12: LocationList[] = [];
    let list14: LocationList[] = [];
    let list16: LocationList[] = [];
    let list18: LocationList[] = [];
    let list20: LocationList[] = [];
    let list22: LocationList[] = [];
    let list24: LocationList[] = [];
    let list26: LocationList[] = [];
    let list28: LocationList[] = [];
    let list30: LocationList[] = [];
    let list32: LocationList[] = [];
    let list34: LocationList[] = [];
    let list36: LocationList[] = [];
    let list38: LocationList[] = [];
    let list40: LocationList[] = [];
    let listLate: LocationList[] = [];
    // @ts-ignore
    this.matchlist.forEach((match) => {
      if (this.team === "blue" || this.team === "both") {
        match.teamBlue.champions.forEach((champion) => {
          if (champion.player === playerName) {
            champion.positions.forEach((pos) => {
              if (pos.time/1000/60 <= 2) {
                list02.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 4) {
                list04.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 6) {
                list06.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 8) {
                list08.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 10) {
                list10.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 12) {
                list12.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 14) {
                list14.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 16) {
                list16.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 18) {
                list18.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 20) {
                list20.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 22) {
                list22.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 24) {
                list24.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 26) {
                list26.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 28) {
                list28.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 30) {
                list30.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 32) {
                list32.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 34) {
                list34.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 36) {
                list36.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time/1000/60 <= 38) {
                list38.push(new LocationList(pos.x, pos.y))
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
              if (pos.time / 1000 / 60 <= 2) {
                list02.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 4) {
                list04.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 6) {
                list06.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 8) {
                list08.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 10) {
                list10.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 12) {
                list12.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 14) {
                list14.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 16) {
                list16.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 18) {
                list18.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 20) {
                list20.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 22) {
                list22.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 24) {
                list24.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 26) {
                list26.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 28) {
                list28.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 30) {
                list30.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 32) {
                list32.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 34) {
                list34.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 36) {
                list36.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 38) {
                list38.push(new LocationList(pos.x, pos.y))
                list.push(new LocationList(pos.x, pos.y))
              } else if (pos.time / 1000 / 60 <= 40) {
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
    this.mins00To02 = list02;
    this.mins02To04 = list04;
    this.mins04To06 = list06;
    this.mins06To08 = list08;
    this.mins08To10 = list10;
    this.mins10To12 = list12;
    this.mins12To14 = list14;
    this.mins14To16 = list16;
    this.mins16To18 = list18;
    this.mins18To20 = list20;
    this.mins20To22 = list22;
    this.mins22To24 = list24;
    this.mins24To26 = list26;
    this.mins26To28 = list28;
    this.mins28To30 = list30;
    this.mins30To32 = list32;
    this.mins32To34 = list34;
    this.mins34To36 = list36;
    this.mins36To38 = list38;
    this.mins38To40 = list40;
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

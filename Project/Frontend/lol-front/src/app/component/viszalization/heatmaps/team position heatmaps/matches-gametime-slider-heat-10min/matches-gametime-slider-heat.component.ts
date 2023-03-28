import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatchData} from "../../../../../dto/matchData";
import {LocationList} from "../../../../../dto/locationList";
import * as d3 from "d3";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-matches-gametime-slider-heat',
  templateUrl: './matches-gametime-slider-heat.component.html',
  styleUrls: ['./matches-gametime-slider-heat.component.css']
})
export class MatchesGametimeSliderHeatComponent implements OnInit {

  // @ts-ignore
  @Input() matchData: MatchData[];
  // @ts-ignore
  @Input() team: String;
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
  private mins00To10: LocationList[];
  // @ts-ignore
  private mins10To20: LocationList[];
  // @ts-ignore
  private mins20To30: LocationList[];
  // @ts-ignore
  private mins30To40: LocationList[];
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

  chosenTime = 60;

  slider = new FormGroup({
    time: new FormControl(60),
  });

  constructor() { }

  ngOnInit(): void {
    this.matchlist = this.matchData;
    this.prepareData();
    this.determineBandwidth();
    this.determineColors();

  }

  ngAfterViewInit() {
    this.createSvg();
    this.createColorRange();
    this.drawPlot();
  }

  gameTime: number = 10;
  // @ts-ignore
  interval: NodeJS.Timeout | undefined;
  play: boolean = false;

  startPlaying() {
    this.interval = setInterval(() => {
      if(this.gameTime <= 60) {
        this.slider.patchValue({
          time: this.gameTime,
        });
        this.updateTimeSlice();
        this.gameTime+=10;
      } else {
        this.gameTime = 10;
      }
    },1000)
  }

  stopPlaying() {
    clearInterval(this.interval);
  }

  updateTimeSlice(): void {
    this.chosenTime = this.slider.get("time")?.value;
    this.gameTime = this.chosenTime;
    if (this.chosenTime == 60) {
      this.locationList = this.wholeGame;
    } else if (this.chosenTime == 50) {
      this.locationList = this.mins40plus
    } else if (this.chosenTime == 40) {
      this.locationList = this.mins30To40
    } else if (this.chosenTime == 30) {
      this.locationList = this.mins20To30
    } else if (this.chosenTime == 20) {
      this.locationList = this.mins10To20
    } else if (this.chosenTime == 10) {
      this.locationList = this.mins00To10
    }  else {
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
    let list10: LocationList[] = [];
    let list20: LocationList[] = [];
    let list30: LocationList[] = [];
    let list40: LocationList[] = [];
    let listLate: LocationList[] = [];
    // @ts-ignore
    this.matchlist.forEach((match) => {
      if (this.team === "blue" || this.team === "both") {
        match.teamBlue.champions.forEach((champion) => {
          champion.positions.forEach((pos) => {
            if (pos.time/1000/60 <= 10) {
              list10.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 20) {
              list20.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 30) {
              list30.push(new LocationList(pos.x, pos.y))
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
            if (pos.time/1000/60 <= 10) {
              list10.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 20) {
              list20.push(new LocationList(pos.x, pos.y))
              list.push(new LocationList(pos.x, pos.y))
            } else if (pos.time/1000/60 <= 30) {
              list30.push(new LocationList(pos.x, pos.y))
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
    this.mins00To10 = list10;
    this.mins10To20 = list20;
    this.mins20To30 = list30;
    this.mins30To40 = list40;
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

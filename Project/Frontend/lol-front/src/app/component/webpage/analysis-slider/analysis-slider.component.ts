import {Component, OnInit, Output} from '@angular/core';
import {MatchData} from "../../../dto/matchData";
import {FormControl, FormGroup} from "@angular/forms";
import {MatchDataService} from "../../../service/match-data.service";

@Component({
  selector: 'app-analysis-slider',
  templateUrl: './analysis-slider.component.html',
  styleUrls: ['./analysis-slider.component.css']
})
export class AnalysisSliderComponent implements OnInit {

  // @ts-ignore
  @Output() matchData: MatchData[];
  // @ts-ignore
  @Output() champion: String;
  // @ts-ignore
  @Output() team: String;
// @ts-ignore
  @Output() otherTeam: String;

  searchForm = new FormGroup({
    playerName: new FormControl(''),
    championName: new FormControl(''),
    playerTeam: new FormControl(''),
    playerResult: new FormControl(''),
  });

  searched = false;

  sliderType = new FormGroup({
    intervalSize: new FormControl(),
  });

  sliders = [
    { id: 1, name: "1-Minute Intervals" },
    { id: 2, name: "2-Minute Intervals" },
    { id: 5, name: "5-Minute Intervals" },
    { id: 10, name: "10-Minute Intervals" },
    { id: 15, name: "15-Minute Intervals" }
  ];


  updateSliderComponent(): void {
    this.chosenSlider = this.sliderType.get("intervalSize")?.value;
  }

  // @ts-ignore
  chosenSlider: String = 10;

  constructor(private matchDataService: MatchDataService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // @ts-ignore
    if (this.searchForm.get('championName').value === '') {
      this.otherTeam = "none";
      // @ts-ignore
      this.matchDataService.getAllMatches(this.searchForm.get('playerName').value, "all").
      subscribe((matchData: MatchData[]) => {
        this.matchData = matchData;});
    } else {
      // @ts-ignore
      if (this.searchForm.get('playerTeam').value === '' && this.searchForm.get('playerResult').value === '') {
        // @ts-ignore
        this.otherTeam = "none";
        // @ts-ignore
        this.matchDataService.getAllMatches(this.searchForm.get('playerName').value, this.searchForm.get('championName').value).
        subscribe((matchData: MatchData[]) => {
          this.matchData = matchData;});
        // @ts-ignore
      } else if (this.searchForm.get('playerResult').value === '') {
        // @ts-ignore
        this.team = this.searchForm.get('playerTeam').value;
        if (this.team === "blue") {
          this.otherTeam = "red";
        } else {
          this.otherTeam = "blue;"
        }
        // @ts-ignore
        this.matchDataService.getAllMatchesWithTeam(this.searchForm.get('playerName').value, this.searchForm.get('championName').value,
          // @ts-ignore
          this.searchForm.get('playerTeam').value).subscribe((matchData: MatchData[]) => {
          this.matchData = matchData;});
      } else {
        // @ts-ignore
        this.team = this.searchForm.get('playerTeam').value;
        if (this.team === "blue") {
          this.otherTeam = "red";
        } else {
          this.otherTeam = "blue;"
        }
        // @ts-ignore
        if (this.searchForm.get('championName').value === 'sup' || this.searchForm.get('championName').value === 'adc' || this.searchForm.get('championName').value === 'mid'
          // @ts-ignore
          || this.searchForm.get('championName').value === 'top' ||this.searchForm.get('championName').value === 'jgl' ) {
          // @ts-ignore
          this.matchDataService.getAllMatchesWithPositionWithTeamAndResult(this.searchForm.get('playerName').value, "pool", this.searchForm.get('championName').value,
            // @ts-ignore
            this.searchForm.get('playerTeam').value, this.searchForm.get('playerResult').value).subscribe((matchData: MatchData[]) => {
            this.matchData = matchData;});
        } else {
          // @ts-ignore
          this.matchDataService.getAllMatchesWithTeamAndResult(this.searchForm.get('playerName').value, this.searchForm.get('championName').value,
            // @ts-ignore
            this.searchForm.get('playerTeam').value, this.searchForm.get('playerResult').value).subscribe((matchData: MatchData[]) => {
            this.matchData = matchData;});
        }
      }
    }

    this.searched = true;
    // @ts-ignore
    this.champion = this.searchForm.get('championName').value;

  }

  resetSearch() {
    this.searchForm.patchValue({
      playerName: '',
      championName: '',
      playerTeam: '',
      playerResult: '',
    });
    this.refresh();
    this.searched = false;
  }

  refresh(): void {
    window.location.reload();
  }

}

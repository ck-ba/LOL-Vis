import {Component, OnInit, Output} from '@angular/core';
import {MatchData} from "../../../dto/matchData";
import {FormControl, FormGroup} from "@angular/forms";
import {MatchDataService} from "../../../service/match-data.service";
import {MultiplayerMatchDataService} from "../../../service/multiplayer-match-data.service";

@Component({
  selector: 'app-analysis-slider-multiplayer',
  templateUrl: './analysis-slider-multiplayer.component.html',
  styleUrls: ['./analysis-slider-multiplayer.component.css']
})
export class AnalysisSliderMultiplayerComponent implements OnInit {

  // @ts-ignore
  @Output() matchData: MatchData[];
  // @ts-ignore
  @Output() team: String;
// @ts-ignore
  @Output() otherTeam: String;


  searchForm = new FormGroup({
    playerTeam: new FormControl(''),
    playerResult: new FormControl(''),
    length: new FormControl('300'),
  });

  sliderType = new FormGroup({
    intervalSize: new FormControl( ),
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

  searched = false;

  constructor(private multiplayerMatchDataService: MultiplayerMatchDataService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // @ts-ignore
    if (this.searchForm.get('playerTeam').value === '') {
      // @ts-ignore
      this.multiplayerMatchDataService.getAllMatchesWithTypeAndTeamAndResult("Classic", "both",
        // @ts-ignore
        "both", this.searchForm.get('length').value).subscribe((matchData: MatchData[]) => {
        this.matchData = matchData;});
      // @ts-ignore
    } else if (this.searchForm.get('playerResult').value === '') {
      // @ts-ignore
      this.multiplayerMatchDataService.getAllMatchesWithTypeAndTeamAndResult("Classic", this.searchForm.get('playerTeam').value,
        // @ts-ignore
        "both", this.searchForm.get('length').value).subscribe((matchData: MatchData[]) => {
        this.matchData = matchData;});
    } else {
      // @ts-ignore
      this.multiplayerMatchDataService.getAllMatchesWithTypeAndTeamAndResult("Classic", this.searchForm.get('playerTeam').value,
        // @ts-ignore
        this.searchForm.get('playerResult').value, this.searchForm.get('length').value).subscribe((matchData: MatchData[]) => {
        this.matchData = matchData;});
    }

    this.searched = true;
  }


  resetSearch() {
    this.searchForm.patchValue({
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

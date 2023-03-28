import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdapterComponent } from './adapter/adapter.component';
import { ChampionDeathsComponent } from './component/webpage/obsolete/champion-deaths/champion-deaths.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { StartComponent } from './start/start.component';
import { HeaderComponent } from './navigation/header.component';
import { CoordinateTableComponent } from './component/listdata/coordinate-table/coordinate-table.component';
import { DeathMapScatterplotComponent } from './component/viszalization/other/death-map-scatterplot/death-map-scatterplot.component';
import { DeathMapRasterComponent } from './component/viszalization/other/death-map-raster/death-map-raster.component';
import { SingleMatchComponent } from './component/webpage/obsolete/single-match/single-match.component';
import { MatchTableComponent } from './component/listdata/match-table/match-table.component';
import { MatchMapComponent } from './component/viszalization/other/match-map/match-map.component';
import { MasterAnalysisComponent } from './component/webpage/obsolete/master-analysis/master-analysis.component';
import { DeathMapHeatComponent } from './component/viszalization/heatmaps/obsolete/death-map-heat/death-map-heat.component';
import { MatchesTeamMapHeatComponent } from './component/viszalization/heatmaps/obsolete/matches-team-map-heat/matches-team-map-heat.component';
import { MatchesChampionLocationsHeatComponent } from './component/viszalization/heatmaps/obsolete/matches-champion-locations-heat/matches-champion-locations-heat.component';
import { MatchesGametimeSliderHeatComponent } from './component/viszalization/heatmaps/team position heatmaps/matches-gametime-slider-heat-10min/matches-gametime-slider-heat.component';
import { AnalysisSliderComponent } from './component/webpage/analysis-slider/analysis-slider.component';
import { MatchesSinglechampLocationsSliderHeatComponent } from './component/viszalization/heatmaps/obsolete/matches-singlechamp-locations-slider-heat/matches-singlechamp-locations-slider-heat.component';
import { AnalysisSliderSinglesComponent } from './component/webpage/analysis-slider-singles/analysis-slider-singles.component';
import {
  AnalysisSliderMultiplayerComponent
} from "./component/webpage/analysis-slider-multiplayer/analysis-slider-multiplayer.component";
import {
  MatchesGametimeSliderFineHeatComponent
} from "./component/viszalization/heatmaps/team position heatmaps/matches-gametime-sliderFine-heat-5min/matches-gametime-sliderFine-heat.component";
import { MatchesGamephaseSliderHeatComponent } from './component/viszalization/heatmaps/team position heatmaps/matches-gamephase-slider-heat-15min/matches-gamephase-slider-heat.component';
import { MatchesGametimeDetailAnimationHeatComponent } from './component/viszalization/heatmaps/team position heatmaps/matches-gametime-detail-animation-heat-2min/matches-gametime-detail-animation-heat.component';
import { HeatmapAnimationFineComponent } from './component/viszalization/heatmaps/team position heatmaps/heatmap-animation-fine-1min/heatmap-animation-fine.component';
import { MapContainerComponent } from './component/webpage/obsolete/map-container/map-container.component';
import { MatchesSingleLocsFifteenComponent } from './component/viszalization/heatmaps/player position heatmaps/matches-single-locs-fifteen/matches-single-locs-fifteen.component';
import { MatchesSingleLocsTenComponent } from './component/viszalization/heatmaps/player position heatmaps/matches-single-locs-ten/matches-single-locs-ten.component';
import { MatchesSingleLocsFiveComponent } from './component/viszalization/heatmaps/player position heatmaps/matches-single-locs-five/matches-single-locs-five.component';
import { MatchesSingleLocsTwoComponent } from './component/viszalization/heatmaps/obsolete/matches-single-locs-two/matches-single-locs-two.component';
import { MatchesSingleLocsOneComponent } from './component/viszalization/heatmaps/obsolete/matches-single-locs-one/matches-single-locs-one.component';


@NgModule({
  declarations: [
    AdapterComponent,
    AppComponent,
    ChampionDeathsComponent,
    StartComponent,
    HeaderComponent,
    CoordinateTableComponent,
    DeathMapScatterplotComponent,
    DeathMapRasterComponent,
    SingleMatchComponent,
    MatchTableComponent,
    MatchMapComponent,
    MasterAnalysisComponent,
    DeathMapHeatComponent,
    MatchesTeamMapHeatComponent,
    MatchesChampionLocationsHeatComponent,
    MatchesGametimeSliderHeatComponent,
    MatchesGametimeSliderFineHeatComponent,
    AnalysisSliderComponent,
    MatchesSinglechampLocationsSliderHeatComponent,
    AnalysisSliderSinglesComponent,
    AnalysisSliderMultiplayerComponent,
    MatchesGamephaseSliderHeatComponent,
    MatchesGametimeDetailAnimationHeatComponent,
    HeatmapAnimationFineComponent,
    MapContainerComponent,
    MatchesSingleLocsFifteenComponent,
    MatchesSingleLocsTenComponent,
    MatchesSingleLocsFiveComponent,
    MatchesSingleLocsTwoComponent,
    MatchesSingleLocsOneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule ,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule {}
// @ts-ignore

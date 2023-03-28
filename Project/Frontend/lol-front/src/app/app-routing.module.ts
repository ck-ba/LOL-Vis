import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./start/start.component";
import {AnalysisSliderComponent} from "./component/webpage/analysis-slider/analysis-slider.component";
import {
  AnalysisSliderSinglesComponent
} from "./component/webpage/analysis-slider-singles/analysis-slider-singles.component";
import {
  AnalysisSliderMultiplayerComponent
} from "./component/webpage/analysis-slider-multiplayer/analysis-slider-multiplayer.component";


const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full'},
  { path: 'start', component: StartComponent},
  { path: 'slider', component: AnalysisSliderComponent},
  { path: 'sliderSingles', component: AnalysisSliderSinglesComponent},
  { path: 'sliderMultiplePlayers', component: AnalysisSliderMultiplayerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

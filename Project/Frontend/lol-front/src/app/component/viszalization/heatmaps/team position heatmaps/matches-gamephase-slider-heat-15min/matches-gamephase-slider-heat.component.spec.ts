import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesGamephaseSliderHeatComponent } from './matches-gamephase-slider-heat.component';

describe('MatchesGamephaseSliderHeatComponent', () => {
  let component: MatchesGamephaseSliderHeatComponent;
  let fixture: ComponentFixture<MatchesGamephaseSliderHeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesGamephaseSliderHeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesGamephaseSliderHeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

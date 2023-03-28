import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesGametimeSliderHeatComponent } from './matches-gametime-slider-heat.component';

describe('MatchesGametimeSliderHeatComponent', () => {
  let component: MatchesGametimeSliderHeatComponent;
  let fixture: ComponentFixture<MatchesGametimeSliderHeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesGametimeSliderHeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesGametimeSliderHeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

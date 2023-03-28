import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesGametimeSliderFineHeatComponent } from './matches-gametime-sliderFine-heat.component';

describe('MatchesGametimeSliderHeatComponent', () => {
  let component: MatchesGametimeSliderFineHeatComponent;
  let fixture: ComponentFixture<MatchesGametimeSliderFineHeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesGametimeSliderFineHeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesGametimeSliderFineHeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

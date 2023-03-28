import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisSliderComponent } from './analysis-slider-multiplayer.component';

describe('AnalysisSliderComponent', () => {
  let component: AnalysisSliderComponent;
  let fixture: ComponentFixture<AnalysisSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

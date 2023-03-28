import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisSliderSinglesComponent } from './analysis-slider-singles.component';

describe('AnalysisSliderSinglesComponent', () => {
  let component: AnalysisSliderSinglesComponent;
  let fixture: ComponentFixture<AnalysisSliderSinglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisSliderSinglesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisSliderSinglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

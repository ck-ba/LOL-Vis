import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapAnimationFineComponent } from './heatmap-animation-fine.component';

describe('HeatmapAnimationFineComponent', () => {
  let component: HeatmapAnimationFineComponent;
  let fixture: ComponentFixture<HeatmapAnimationFineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatmapAnimationFineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapAnimationFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

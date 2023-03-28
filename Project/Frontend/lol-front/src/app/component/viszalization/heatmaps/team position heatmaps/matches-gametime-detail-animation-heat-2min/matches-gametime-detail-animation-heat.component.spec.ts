import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesGametimeDetailAnimationHeatComponent } from './matches-gametime-detail-animation-heat.component';

describe('MatchesGametimeDetailAnimationHeatComponent', () => {
  let component: MatchesGametimeDetailAnimationHeatComponent;
  let fixture: ComponentFixture<MatchesGametimeDetailAnimationHeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesGametimeDetailAnimationHeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesGametimeDetailAnimationHeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

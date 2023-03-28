import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesSingleLocsTenComponent } from './matches-single-locs-ten.component';

describe('MatchesSingleLocsTenComponent', () => {
  let component: MatchesSingleLocsTenComponent;
  let fixture: ComponentFixture<MatchesSingleLocsTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesSingleLocsTenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesSingleLocsTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

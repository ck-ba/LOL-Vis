import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesSingleLocsFifteenComponent } from './matches-single-locs-fifteen.component';

describe('MatchesSingleLocsFifteenComponent', () => {
  let component: MatchesSingleLocsFifteenComponent;
  let fixture: ComponentFixture<MatchesSingleLocsFifteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesSingleLocsFifteenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesSingleLocsFifteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

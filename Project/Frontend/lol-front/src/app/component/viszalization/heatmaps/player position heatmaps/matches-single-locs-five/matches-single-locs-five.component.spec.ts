import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesSingleLocsFiveComponent } from './matches-single-locs-five.component';

describe('MatchesSingleLocsFiveComponent', () => {
  let component: MatchesSingleLocsFiveComponent;
  let fixture: ComponentFixture<MatchesSingleLocsFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesSingleLocsFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesSingleLocsFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsdisplayComponent } from './labelsdisplay.component';

describe('LabelsdisplayComponent', () => {
  let component: LabelsdisplayComponent;
  let fixture: ComponentFixture<LabelsdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelsdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

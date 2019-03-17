import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogdataComponent } from './dialogdata.component';

describe('DialogdataComponent', () => {
  let component: DialogdataComponent;
  let fixture: ComponentFixture<DialogdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

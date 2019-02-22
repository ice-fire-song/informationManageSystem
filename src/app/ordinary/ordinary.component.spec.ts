import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinaryComponent } from './ordinary.component';

describe('OrdinaryComponent', () => {
  let component: OrdinaryComponent;
  let fixture: ComponentFixture<OrdinaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdinaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

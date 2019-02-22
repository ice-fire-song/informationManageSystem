import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWinComponent } from './registerwin.component';

describe('RegisterWinComponent', () => {
  let component: RegisterWinComponent;
  let fixture: ComponentFixture<RegisterWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterokComponent } from './registerok.component';

describe('RegisterokComponent', () => {
  let component: RegisterokComponent;
  let fixture: ComponentFixture<RegisterokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

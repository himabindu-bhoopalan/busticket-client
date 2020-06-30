import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindbusesComponent } from './findbuses.component';

describe('FindbusesComponent', () => {
  let component: FindbusesComponent;
  let fixture: ComponentFixture<FindbusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindbusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindbusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprofbusopComponent } from './viewprofbusop.component';

describe('ViewprofbusopComponent', () => {
  let component: ViewprofbusopComponent;
  let fixture: ComponentFixture<ViewprofbusopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewprofbusopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewprofbusopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

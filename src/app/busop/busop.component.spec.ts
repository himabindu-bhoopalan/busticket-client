import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusopComponent } from './busop.component';

describe('BusopComponent', () => {
  let component: BusopComponent;
  let fixture: ComponentFixture<BusopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

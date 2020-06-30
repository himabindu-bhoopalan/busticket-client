import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusopapComponent } from './busopap.component';

describe('BusopapComponent', () => {
  let component: BusopapComponent;
  let fixture: ComponentFixture<BusopapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusopapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusopapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

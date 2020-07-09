import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsBusopComponent } from './seats-busop.component';

describe('SeatsBusopComponent', () => {
  let component: SeatsBusopComponent;
  let fixture: ComponentFixture<SeatsBusopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatsBusopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsBusopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

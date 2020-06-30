import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBusOpComponent } from './navbar-bus-op.component';

describe('NavbarBusOpComponent', () => {
  let component: NavbarBusOpComponent;
  let fixture: ComponentFixture<NavbarBusOpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarBusOpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarBusOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

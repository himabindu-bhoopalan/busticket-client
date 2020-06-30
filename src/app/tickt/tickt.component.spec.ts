import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicktComponent } from './tickt.component';

describe('TicktComponent', () => {
  let component: TicktComponent;
  let fixture: ComponentFixture<TicktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailExternalComponent } from './ticket-detail-external.component';

describe('TicketDetailComponent', () => {
  let component: TicketDetailExternalComponent;
  let fixture: ComponentFixture<TicketDetailExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketDetailExternalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketDetailExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

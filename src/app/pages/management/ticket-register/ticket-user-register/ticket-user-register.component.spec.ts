import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketUserRegisterComponent } from './ticket-user-register.component';

describe('TicketUserRegisterComponent', () => {
  let component: TicketUserRegisterComponent;
  let fixture: ComponentFixture<TicketUserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketUserRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

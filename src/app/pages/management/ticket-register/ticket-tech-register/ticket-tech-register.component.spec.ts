import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTechRegisterComponent } from './ticket-tech-register.component';

describe('TicketTechRegisterComponent', () => {
  let component: TicketTechRegisterComponent;
  let fixture: ComponentFixture<TicketTechRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketTechRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketTechRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

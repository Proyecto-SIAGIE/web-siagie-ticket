import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketTechRegisterRoutingModule } from './ticket-tech-register-routing.module';
import { TicketTechRegisterComponent } from './ticket-tech-register.component';



@NgModule({
  declarations: [TicketTechRegisterComponent],
  imports: [
    CommonModule,
    TicketTechRegisterRoutingModule
  ]
})
export class TicketTechRegisterModule { }

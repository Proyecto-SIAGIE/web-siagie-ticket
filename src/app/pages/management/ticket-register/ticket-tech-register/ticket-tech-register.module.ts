import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketTechRegisterRoutingModule } from './ticket-tech-register-routing.module';
import { TicketTechRegisterComponent } from './ticket-tech-register.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from "@ng-select/ng-select";


@NgModule({
  declarations: [TicketTechRegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    TicketTechRegisterRoutingModule
  ]
})
export class TicketTechRegisterModule { }

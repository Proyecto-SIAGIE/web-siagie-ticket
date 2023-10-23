import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketTechRegisterRoutingModule } from './ticket-tech-register-routing.module';
import { TicketTechRegisterComponent } from './ticket-tech-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from "@ng-select/ng-select";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { SharedModule } from 'src/app/modules/shared.module';


@NgModule({
  declarations: [TicketTechRegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    TicketTechRegisterRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TicketTechRegisterModule { }

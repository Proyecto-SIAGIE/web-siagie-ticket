import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketUserRegisterRoutingModule } from './ticket-user-register-routing.module';
import { TicketUserRegisterComponent } from './ticket-user-register.component';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { NgSelectModule } from "@ng-select/ng-select";



@NgModule({
  declarations: [TicketUserRegisterComponent],
  imports: [
    CommonModule,
    TicketUserRegisterRoutingModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgSelectModule,
    MatSelectModule
    
  ]
})
export class TicketUserRegisterModule { }

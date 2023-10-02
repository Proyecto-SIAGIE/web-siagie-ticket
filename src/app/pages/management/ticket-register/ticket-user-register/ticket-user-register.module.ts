import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketUserRegisterRoutingModule } from './ticket-user-register-routing.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TicketUserRegisterComponent } from './ticket-user-register.component';

@NgModule({
    declarations: [TicketUserRegisterComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        TicketUserRegisterRoutingModule
    ]
})
export class TicketUserResgisterMoodule { }
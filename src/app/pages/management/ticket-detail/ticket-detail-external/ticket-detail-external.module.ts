import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { TicketDetailExternalComponent } from "./ticket-detail-external.component";
import { TicketDetailExternalRoutingModule } from "./ticket-detail-external-routing.module";

@NgModule({
  declarations: [TicketDetailExternalComponent],
  imports: [
    CommonModule,
    FormsModule,
    TicketDetailExternalRoutingModule
  ]
})
export class TicketDetailExternalModule{}

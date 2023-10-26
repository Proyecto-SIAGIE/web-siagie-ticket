import { CommonModule } from "@angular/common";
import { Injectable, NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { TableTicketComponent } from "./table-ticket.component";
import { TableTicketRoutingModule } from "./table-ticket-external-routing.module";

@NgModule({
    declarations: [TableTicketComponent],
    imports: [
      CommonModule,
      FormsModule,
      TableTicketRoutingModule,
      HttpClientModule
    ],
    providers:[]
  })

  export class TableTicketModule{}
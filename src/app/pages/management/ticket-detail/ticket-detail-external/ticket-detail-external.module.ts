import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { TicketDetailExternalComponent } from "./ticket-detail-external.component";
import { TicketDetailExternalRoutingModule } from "./ticket-detail-external-routing.module";

import { NgSelectModule } from "@ng-select/ng-select";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from  '@angular/material/list' ;


@NgModule({
  declarations: [TicketDetailExternalComponent],
  imports: [
    CommonModule,
    FormsModule,
    TicketDetailExternalRoutingModule,
    NgSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,

  ]
})
export class TicketDetailExternalModule{}

import { RouterModule, Routes } from "@angular/router";
import { TableTicketComponent } from "./table-ticket.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{ path: '', component: TableTicketComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableTicketRoutingModule{}
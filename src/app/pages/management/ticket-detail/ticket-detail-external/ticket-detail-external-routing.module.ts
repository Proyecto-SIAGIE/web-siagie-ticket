import { RouterModule, Routes } from "@angular/router";
import { TicketDetailExternalComponent } from "./ticket-detail-external.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{ path: '', component: TicketDetailExternalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketDetailExternalRoutingModule {}

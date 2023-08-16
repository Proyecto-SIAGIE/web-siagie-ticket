import { RouterModule, Routes } from "@angular/router";
import { TicketTechRegisterComponent } from "./ticket-tech-register.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{ path: '', component: TicketTechRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketTechRegisterRoutingModule {}

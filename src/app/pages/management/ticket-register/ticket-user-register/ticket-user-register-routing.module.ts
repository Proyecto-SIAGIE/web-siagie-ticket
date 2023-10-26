
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketUserRegisterComponent } from './ticket-user-register.component';

const routes: Routes = [{ path: '', component: TicketUserRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketUserRegisterRoutingModule { }

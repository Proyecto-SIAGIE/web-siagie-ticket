import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "ticket-by-tech",
    loadChildren: () =>
      import("./pages/management/ticket-register/ticket-tech-register/ticket-tech-register.module").then(
        (mod) => mod.TicketTechRegisterModule
      ),
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

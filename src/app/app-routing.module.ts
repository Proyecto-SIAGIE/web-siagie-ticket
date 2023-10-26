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
  },
  {
    path: "ticket-by-user",
    loadChildren: () =>
      import("./pages/management/ticket-register/ticket-user-register/ticket-user-register.module").then(
        (mod) => mod.TicketUserRegisterModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/security/login/login.module").then(
        (mod) => mod.LoginModule
      ),
  },
  {
    path: "ticket/:id",
    loadChildren: () =>
    import("./pages/management/ticket-detail/ticket-detail-external/ticket-detail-external.module").then(
      (mod) => mod.TicketDetailExternalModule
    ),
  },
  {
    path: "ticket-reports",
    loadChildren: () =>
    import ("./pages/ticket-reports/ticket-reports.module").then(
      (mod)=> mod.TicketReportsModule
    )
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

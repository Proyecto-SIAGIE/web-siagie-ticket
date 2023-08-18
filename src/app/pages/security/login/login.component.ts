import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  unsuscribe = new Subject<void>();

  constructor(private securityService: SecurityService) { }


  login() {

    this.securityService
      .fnApiSeguridadControlBoot()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: async (response: any) => {
          const bootKey = response.Token;
          //console.log(bootKey);
          await this.securityService.fnApiSeguridadLoginData(bootKey)
        },
        error: (error: any) => {
          console.log(error);
        }
      })


  }

  ngOnDestroy(): void {
    this.unsuscribe.next();
    this.unsuscribe.complete();
  }


}

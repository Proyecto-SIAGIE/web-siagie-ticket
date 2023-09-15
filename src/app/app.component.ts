import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-ticket';
  isLoggedIn$: boolean = false;

  constructor() {
    //MODIFICA AQUI PARA MOSTRAR O NO EL HEADER, YA PENSARÉ EN DINAMIZARLO
    this.isLoggedIn$ = true;
  }
}

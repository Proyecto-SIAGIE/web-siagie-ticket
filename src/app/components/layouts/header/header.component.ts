import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input()
  siagie_logo_alt: string = 'image'
  @Input()
  siagie_logo_src: string = '/siagie-logo-200h.png'
  @Input()
  minedu_logo_src: string = '/minedu-logo-200h.png'
  @Input()
  minedu_logo_alt: string = 'image'
  constructor() {}
}

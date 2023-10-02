import { Component, Injectable, OnInit } from '@angular/core';
import { GestorTicketService } from 'src/app/services/gestor-ticket.service';
import { Ticket_Detail } from 'src/app/models/ticket_detail';
import { Ticket_Notes } from 'src/app/models/ticket_notes';
import { Ticket } from 'src/app/models/ticket';
import { User_External } from 'src/app/models/user-external';

import { Router,  ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-ticket-detail-external',
  templateUrl: './ticket-detail-external.component.html',
  styleUrls: ['./ticket-detail-external.component.css']
})

export class TicketDetailExternalComponent implements OnInit {
  tickets: Ticket[] = [];
  ticket_Details: Ticket_Detail[] = [];
  user_externals: User_External[] = [];
  ticket_notes: Ticket_Notes[] = [];


  constructor(
    private active_route: ActivatedRoute,
    private gestion_ticket_service: GestorTicketService,
    ){
    }


  ngOnInit(): void {
    let ticket_id : any = this.active_route.snapshot.paramMap.get('id') // AL MOMENTO DE SELECCIONAR EL TICKET LE MUESTRA LOS DETALLES POR ID
   
    this.gestion_ticket_service.GetTickte_BY_ID(ticket_id).subscribe(data => this.tickets = data)
    this.gestion_ticket_service.GetTicketDetail_BY_ID(ticket_id).subscribe(data => this.ticket_Details = data)
    this.gestion_ticket_service.GetNotes_by_TicketID(ticket_id).subscribe(data => this.ticket_notes = data)
    this.gestion_ticket_service.GetUserExternal_BY_ID(ticket_id).subscribe(data => this.user_externals = data)

    }
}
 
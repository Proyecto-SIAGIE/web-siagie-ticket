import { Component, Injectable, OnInit } from '@angular/core';
import { GestorTicketService } from 'src/app/services/gestor-ticket.service';
import { TicketDetail } from 'src/app/models/ticket-detail';
import { TicketNotes } from 'src/app/models/ticket-notes';
import { Ticket } from 'src/app/models/ticket';
import { UserExternal } from 'src/app/models/user-external';

import { Router,  ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-ticket-detail-external',
  templateUrl: './ticket-detail-external.component.html',
  styleUrls: ['./ticket-detail-external.component.css']
})

export class TicketDetailExternalComponent implements OnInit {
  tickets!: Ticket;
  ticket_Details!: TicketDetail;
  user_externals!: UserExternal;
  ticket_notes!: TicketNotes;


  constructor(
    private active_route: ActivatedRoute,
    private gestion_ticket_service: GestorTicketService,
    ){
    }


  ngOnInit(): void {
    let ticketId : any = this.active_route.snapshot.paramMap.get('id'); // AL MOMENTO DE SELECCIONAR EL TICKET LE MUESTRA LOS DETALLES POR ID
    console.log(ticketId);
    this.gestion_ticket_service.GetTicket_by_Id(ticketId).subscribe(data => this.tickets = data)
    this.gestion_ticket_service.GetTicketDetail_by_Id(ticketId).subscribe(data => this.ticket_Details = data)
    this.gestion_ticket_service.GetNotes_by_TicketID(ticketId).subscribe(data => this.ticket_notes = data)
    this.gestion_ticket_service.GetUserExternal_BY_ID(ticketId).subscribe(data => this.user_externals = data)

  }
}

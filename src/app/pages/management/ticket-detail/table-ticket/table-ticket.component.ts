import { Component, OnInit } from '@angular/core';
import { GestorTicketService } from 'src/app/services/gestor-ticket.service';
import { Ticket_Detail } from 'src/app/models/ticket_detail';
import { Ticket_Notes } from 'src/app/models/ticket_notes';
import { Ticket } from 'src/app/models/ticket';
import { User_External } from 'src/app/models/user-external';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-ticket',
  templateUrl: './table-ticket.component.html',
  styleUrls: ['./table-ticket.component.css']
})
export class TableTicketComponent implements OnInit{
  tickets: Ticket[] = [];
  ticket_Details: Ticket_Detail[] = [];
  user_externals: User_External[] = [];
  ticket_notes: Ticket_Notes[] = [];
  
  constructor(
    private active_route: ActivatedRoute,
    private gestion_ticket_service: GestorTicketService,
    //private ticket: Ticket,
    //private ticket_Detail: Ticket_Detail,
    //private ticket_note: Ticket_Notes,
    //private user_external: User_External
    ){}

    ngOnInit(): void {
      let userId : any = this.active_route.snapshot.paramMap.get('id') // AL MOMENTO DE SELECCIONAR EL TICKET LE MUESTRA LOS DETALLES POR ID
     
      this.gestion_ticket_service.GetTickte_BY_ID(userId).subscribe(data => console.log(this.tickets = data))
      this.gestion_ticket_service.GetTicketDetail_BY_ID(userId).subscribe(data => this.ticket_Details = data)
      this.gestion_ticket_service.GetNotes_by_TicketID(userId).subscribe(data => this.ticket_notes = data)
      this.gestion_ticket_service.GetUserExternal_BY_ID(userId).subscribe(data => this.user_externals = data)
  
      }
  
}

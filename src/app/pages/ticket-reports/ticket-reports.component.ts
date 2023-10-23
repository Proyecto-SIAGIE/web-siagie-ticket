import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



export interface PeriodicElement {
  numero: number;
  ticket: string;
  Asesor: string;
  Fecha: string;
  Usuario: string;
  Tema: string;
  Subtema: string;
  Estado: string;
  Region: string;
  IGED: string;
  resolucion: string;
/*
  */
}

const ELEMENT_DATA: PeriodicElement[] = [
 

  {numero: 1, ticket: 'Ayuda12345678912345678912Ayuda12345678912345678912Ayuda12345678912345678912Ayuda12345678912345678912Ayuda12345678912345678912Ayuda12345678912345678912Ayuda12345678912345678912Ayuda12345678912345678912', Asesor: "Ayuda12345678912345678912-09-09", Fecha: 'Ayuda12345678912345678912', Usuario: 'Ayuda12345678912345678912', Tema: "Ayuda12345678912345678912-09-24", Subtema: 'Ayuda12345678912345678912', Estado: 'Ayuda12345678912345678912', Region: 'Ayuda12345678912345678912', IGED: "Ayuda12345678912345678912-09-24", resolucion: 'Ayuda12345678912345678912Ayuda12345678912345678912Ayuda12345678912345678912Ayuda12345678912345678912Ayuda12345678912345678912Ayuda12345678912345678912Ayuda12345678912345678912Ayuda12345678912345678912Ayuda12345678912345678912'},
  {numero: 1, ticket: 'Ayuda', Asesor: "2023-09-24", Fecha: 'Izarra', Usuario: 'Ayuda', Tema: "2023-09-24", Subtema: 'Izarra', Estado: 'Izarra', Region: 'Ayuda', IGED: "2023-09-24", resolucion: 'Izarra'},
  {numero: 1, ticket: 'Ayuda', Asesor: "2023-09-24", Fecha: 'Izarra', Usuario: 'Ayuda', Tema: "2023-09-24", Subtema: 'Izarra', Estado: 'Izarra', Region: 'Ayuda', IGED: "2023-09-24", resolucion: 'Izarra'},
  {numero: 1, ticket: 'Ayuda', Asesor: "2023-09-24", Fecha: 'Izarra', Usuario: 'Ayuda', Tema: "2023-09-24", Subtema: 'Izarra', Estado: 'Izarra', Region: 'Ayuda', IGED: "2023-09-24", resolucion: 'Izarra'},
  {numero: 1, ticket: 'Ayuda', Asesor: "2023-09-24", Fecha: 'Izarra', Usuario: 'Ayuda', Tema: "2023-09-24", Subtema: 'Izarra', Estado: 'Izarra', Region: 'Ayuda', IGED: "2023-09-24", resolucion: 'Izarra'},
  {numero: 1, ticket: 'Ayuda', Asesor: "2023-09-24", Fecha: 'Izarra', Usuario: 'Ayuda', Tema: "2023-09-24", Subtema: 'Izarra', Estado: 'Izarra', Region: 'Ayuda', IGED: "2023-09-24", resolucion: 'Izarra'},
  {numero: 1, ticket: 'Ayuda', Asesor: "2023-09-24", Fecha: 'Izarra', Usuario: 'Ayuda', Tema: "2023-09-24", Subtema: 'Izarra', Estado: 'Izarra', Region: 'Ayuda', IGED: "2023-09-24", resolucion: 'Izarra'},
  {numero: 1, ticket: 'Ayuda', Asesor: "2023-09-24", Fecha: 'Izarra', Usuario: 'Ayuda', Tema: "2023-09-24", Subtema: 'Izarra', Estado: 'Izarra', Region: 'Ayuda', IGED: "2023-09-24", resolucion: 'Izarra'},
  {numero: 1, ticket: 'Ayuda', Asesor: "2023-09-24", Fecha: 'Izarra', Usuario: 'Ayuda', Tema: "2023-09-24", Subtema: 'Izarra', Estado: 'Izarra', Region: 'Ayuda', IGED: "2023-09-24", resolucion: 'Izarra'},
  {numero: 1, ticket: 'Ayuda', Asesor: "2023-09-24", Fecha: 'Izarra', Usuario: 'Ayuda', Tema: "2023-09-24", Subtema: 'Izarra', Estado: 'Izarra', Region: 'Ayuda', IGED: "2023-09-24", resolucion: 'Izarra'}
 

];

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  templateUrl: './ticket-reports.component.html',
  styleUrls: ['./ticket-reports.component.scss'],
  
})
export class TicketReportsComponent {


 // formBusqueda = new FormGroup({
    codModular: FormControl = new FormControl('',Validators.required);
    estado: FormControl = new FormControl('',Validators.required);
    IdTicket:FormControl = new FormControl('',Validators.required);
    desde: FormControl =new FormControl('',Validators.required);
    hasta: FormControl = new FormControl('',Validators.required);

 // });

  displayedColumns: string[] = ['numero', 'ticket', 'Asesor', 'Fecha','Usuario','Tema','Subtema','Estado','Region','IGED','resolucion'];
  dataSource = ELEMENT_DATA;



}


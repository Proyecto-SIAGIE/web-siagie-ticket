import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map, switchMap, tap } from "rxjs/operators";
import { Institution } from "../models/institution";
import { Ticket } from "../models/ticket";
import { Ticket_Detail } from "../models/ticket_detail";
import { User_External } from "../models/user-external";
import { Ticket_Notes } from "../models/ticket_notes";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GestorTicketService {
  constructor(private http: HttpClient) {}

  registerUser(dataUser: any){
    return this.http.post(`${environment.API_GESTOR_TICKETS}/user-externals`,dataUser,{
      headers: new HttpHeaders()
    }).pipe(
      map((respUser) => {
        return respUser;
      })
    )
  }

  assignRole(roleId: string, userId: string){
    return this.http.patch(`${environment.API_GESTOR_TICKETS}/roles/${roleId}/user-externals/${userId}`,{
      headers: new HttpHeaders()
    }).pipe(
      map((respRole) => {
        return respRole;
      })
    )
  }

  registerTicket(userId: string, ticket: any){
    return this.http.post(`${environment.API_GESTOR_TICKETS}/user-externals/${userId}/tickets`,ticket,{
      headers: new HttpHeaders()
    }).pipe(
      map((respTicket) => {
        return respTicket;
      })
    )
  }

  registerTicketDetail(ticketId: string, ticketDetail: any){
    return this.http.post(`${environment.API_GESTOR_TICKETS}/tickets/${ticketId}/TicketDetail`,ticketDetail,{
      headers: new HttpHeaders()
    }).pipe(
      map((respTicketDetail) => {
        return respTicketDetail;
      })
    )
  }

  registerIE(dataFromIe: any){

    return this.http.post(`${environment.API_GESTOR_TICKETS}/iiees`,dataFromIe,{
      headers: new HttpHeaders()
    }).pipe(
      map((respIe) => {
        return respIe;
      })
    )
  }



  assignIEtoTicket(iieeId: string, ticketId: string){

    return this.http.patch(`${environment.API_GESTOR_TICKETS}/iiees/${iieeId}/tickets/${ticketId}`,{
      headers: new HttpHeaders()
    }).pipe(
      map((respAssign) => {
        return respAssign;
      })
    )
  }

  sendTicketToGlpi(userId: string, ticketId: string, modularCode: string) {
    const formData = new FormData();

    formData.append('userId', userId);
    formData.append('ticketId', ticketId);
    formData.append('iieeModularCode', modularCode);

    return this.http.post(`${environment.API_GESTOR_TICKETS}/tickets/TicketToGLPI`,formData,{
      headers: new HttpHeaders()
    }).pipe(
      map((respGlpi) => {
        return respGlpi;
      })
    )
  }

  getEducativeInstitutions(dreCode: string, ugelCode: string){
    const params = new HttpParams()
    .set('anexo', '0')
    .set('nivel', 'F0');

    return this.http.get(`${environment.API_GESTOR_TICKETS}/api-padron/DRE/${dreCode}/UGEL/${ugelCode}/InstitucionesEducativas`,{params: params}).pipe(
      map((resp:any) => {
        
        if (resp.data && resp.data.length > 0) {
          return resp.data.map((row: Object) => Institution.getJson(row));
        } else {
          return [];
        }
      })
    )
  }

  //GET ALL

  GetTickest(){
    return this.http.get(`${environment.API_GESTOR_TICKETS}/tickets`)
  }

  //GET BY ID

  GetTickte_BY_ID(ticketID: number){
    return this.http.get(`${environment.API_GESTOR_TICKETS}/tickets/${ticketID}`).pipe(
      map((resp:any) => {
        
        if (resp.data && resp.data.length > 0) {
          return resp.data.map((row: Object) => Ticket.getJson(row));
        } else {
          console.log(resp.data) // Respuesta
          return [];
        }
      })
    )
  }

  GetTicketDetail_BY_ID( ticket_detail_Id: number){

    return this.http.get(`${environment.API_GESTOR_TICKETS}/tickets/${ticket_detail_Id}/ticketDetail`).pipe(
      map((resp:any) => {
        
        if (resp.data && resp.data.length > 0) {
          return resp.data.map((row: Object) => Ticket_Detail.getJson(row));
        } else {

          return [];
        }
      })
    )
  }

  GetUserExternal_BY_ID(user_externalId: number){

    return this.http.get(`${environment.API_GESTOR_TICKETS}/user-externals/${user_externalId}`).pipe(
      map((resp:any) => {
        
        if (resp.data && resp.data.length > 0) {
          return resp.data.map((row: Object) => User_External.getJson(row));
        } else {
          return [];
        }
      })
    )
  }

  GetNotes_by_TicketID(Notes_by_TicketId: number){
    return this.http.get(`${environment.API_GESTOR_TICKETS}/tickets/${Notes_by_TicketId}/notes`).pipe(
      map((resp:any) => {
        
        if (resp.data && resp.data.length > 0) {
          return resp.data.map((row: Object) => Ticket_Notes.getJson(row));
        } else {
          return [];
        }
      })
    )
  }


}

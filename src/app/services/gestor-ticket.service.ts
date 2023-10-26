import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map, switchMap, tap } from "rxjs/operators";
import { Institution } from "../models/institution";
import { Observable } from "rxjs";
import { Ticket } from "../models/ticket";
import { TicketDetail } from "../models/ticket-detail";
import { UserExternal } from "../models/user-external";
import { TicketNotes } from "../models/ticket-notes";

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

  sendTicketToGlpi(userId: string, ticketId: string, modularCode: string, files: File[] | null) {
    const formData = new FormData();

    //let _filename: any[] = [];
    if(files?.length != 0 ){
      files?.forEach((file: File) => {
        formData.append("files", file);
        //_filename.push(file.name);
      });
    }

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

  getInstitutionByModularCode(modularCode: string, anexo: string ) {
    const params = new HttpParams()
    .set('anexo', anexo)

    return this.http.get(`${environment.API_GESTOR_TICKETS}/api-padron/IE/${modularCode}`,{
      params:params
    }).pipe(
      map((respAssign: any) => {
        return Institution.getJsonMaterialesPadron(respAssign.data[0]);
      })
    )
  }

  GetTicket_by_Id(ticketId: number) : Observable<Ticket>{

    return this.http.get<Ticket>(`${environment.API_GESTOR_TICKETS}/tickets/${ticketId}`).pipe(
      map((resp) => {
        return resp;
      })
    )
  }

  GetTicketDetail_by_Id(ticket_detail_Id: number) : Observable<TicketDetail>{

    return this.http.get<TicketDetail>(`${environment.API_GESTOR_TICKETS}/tickets/${ticket_detail_Id}/ticketDetail`).pipe(
      map((resp) => {
        return resp;
      })
    )
  }

  GetUserExternal_BY_ID(user_externalId: number) : Observable<UserExternal>{

    return this.http.get<UserExternal>(`${environment.API_GESTOR_TICKETS}/user-externals/${user_externalId}`).pipe(
      map((resp) => {
        return resp;
      })
    )
  }

  GetNotes_by_TicketID(Notes_by_TicketId: number) : Observable<TicketNotes>{
    return this.http.get<TicketNotes>(`${environment.API_GESTOR_TICKETS}/tickets/${Notes_by_TicketId}/notes`).pipe(
      map((resp) => {
        return resp;
      })
    )
  }

}

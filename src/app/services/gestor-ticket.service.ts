import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map, switchMap, tap } from "rxjs/operators";
import { Institution } from "../models/institution";

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


}

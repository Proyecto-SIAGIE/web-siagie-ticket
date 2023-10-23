import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { HelperService } from './helper.service';
import { RolePassport } from '../models/role-passport';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient, private helper: HelperService) { }

  loginPassport(data: any) {

    return this.http.post(`${environment.API_GESTOR_PASSPORT}/auth`, data, { headers: new HttpHeaders() })
    .pipe(
      map((respAuth) => {
        return respAuth;
      })
    )
  }

  searchUserPassport(dni: string){
    return this.http.get(`${environment.API_GESTOR_PASSPORT}/searchUser/${dni}`,{headers: new HttpHeaders() })
    .pipe(
      map((respUser) => {
        return respUser;
      })
    )
  }

  getRolesFromUser(userId: string){
    return this.http.get(`${environment.API_GESTOR_PASSPORT}/user/${userId}/roles`,{headers: new HttpHeaders() })
    .pipe(
      map((respRoles) => {
        return respRoles;
      })
    )


  }

  /*postHandler(url: string, boot: boolean, jsonRequest: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset-UTF-8',
      'Authorization': `Bearer ${accessToken}`
    });
    debugger
    return this.http.post(url, jsonRequest, { headers: headers }).pipe(
      map((response: any) => {
        console.log(response);
        debugger
        const result = response as string;
        return boot ? JSON.parse(result) : result;
      })
    );

  }

  /*fnApiSeguridadControlBoot(): void {
    const urlBoot: string = environment.PASSPORT_URL_SEGURIDAD + '/api/seguridad/control/Boot';
    this.getTokenPassport(urlBoot, true, '', '').subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }*/

  /*fnApiSeguridadControlBoot(): Observable<any> {
    const urlBoot: string = environment.PASSPORT_URL_SEGURIDAD + '/api/seguridad/control/Boot';
    //Obtenemos el token passport
    return this.postHandler(urlBoot, true, '', '');
  }

  async fnApiSeguridadLoginData(bootKey: string) {
    const urlLoginData: string = environment.PASSPORT_URL_SERVICIO + "/api/Seguridad/LoginData";

    const respToken = await this.fnApiAuthenticationLoginServicioData(
      bootKey,
      environment.PASSPORT_CODIGO_SISTEMA,
      environment.CLAVE_ACCESO
    );

    const tokentJwt = respToken.Data[0].TOKEN_JWT;
    const loginRequest = {
      CODIGO_SISTEMA: environment.PASSPORT_CODIGO_SISTEMA,
      NOMBRE_USUARIO_AUTENTICACION: "08122783",
      CONTRASENIA_AUTENTICACION: "a1234567A",
      FINGERPRINT_NAVEGADOR: "chrome"
    }

    const jsonLogin = await this.helper.messagePassport(bootKey, loginRequest);

    this.postHandler(urlLoginData, false, jsonLogin, tokentJwt).subscribe({
      next: async (response: any) => {
        console.log(response);
        const loginResponse = await this.helper.resultPassport(response);
        console.log(loginResponse)
      },
      error: (error: any) => {

        console.log(error);
      }
    });


  }

  async fnApiAuthenticationLoginServicioData(tokenBoot: string, codigoSistema: string, claveAcceso: string): Promise<any> {

    return new Promise<any>(async (resolve, reject) => {
      const urlLoginServicio: string = environment.PASSPORT_URL_SEGURIDAD + "/api/Authentication/LoginServicioData";
      const loginServicioRequest = {
        CODIGO_SISTEMA: codigoSistema,
        CLAVE_ACCESO: claveAcceso
      }

      const jsonLoginServicio = await this.helper.messagePassport(tokenBoot, loginServicioRequest);
      //console.log(jsonLoginServicio);

      this.postHandler(urlLoginServicio, false, jsonLoginServicio, "").subscribe({
        next: async (response: any) => {
          //console.log("respuesta del post: "+ response);
          const loginServicioResponse = await this.helper.resultPassport(response.DataModel);
          resolve(loginServicioResponse)
          //console.log(loginServicioResponse)
          //console.log(loginServicioResponse);
        },
        error: (error: any) => {
          console.log(error);
          reject(error);
        }
      });
    });


  } */


}

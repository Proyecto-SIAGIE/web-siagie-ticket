import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class CaptchaService {
  constructor(private httpClient: HttpClient) { }

  getCaptcha() {
    return this.httpClient.get(`${environment.API_GESTOR_TICKETS}/captcha`, { headers: new HttpHeaders() })
      .pipe(
        map((respCaptcha) => {
          return respCaptcha;
        }))
  }


}

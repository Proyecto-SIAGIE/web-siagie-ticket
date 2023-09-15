import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class GestorGlpiService {

  constructor(private http: HttpClient) {}

  getCategories(){
    return this.http.get(`${environment.API_GESTOR_GLPI}/ITILCategories`,{
      headers: new HttpHeaders()
    }).pipe(
      map((resp: any) => {
        if (resp.data && resp.data.length > 0) {
          return resp.data.map((row: Object) => Category.getJson(row));
        } else {
          return [];
        }
      })
    );
  }
}

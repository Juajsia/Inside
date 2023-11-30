import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredencialesService {
  private myAppUrl: string
  private myApiUrl: string
  constructor(private http:HttpClient) {
    this.myAppUrl = 'http://localhost:1234/'
    this.myApiUrl = 'api/person'
   }

   login(user: any): Observable<any>{
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
   }

   updateContrasenia(Contrasenia: Contrasenia): Observable<void>{
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}/login/change`, Contrasenia)
   }
}

interface Contrasenia {
  correo: string,
  contrasenia: string,
  newContrasenia: string,
}
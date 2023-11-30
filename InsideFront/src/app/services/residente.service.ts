import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Residente } from '../interfaces/residente';

@Injectable({
  providedIn: 'root'
})
export class ResidenteService {

  private myAppUrl: string
  private myApiUrl: string
  constructor(private http:HttpClient) {
    this.myAppUrl = 'http://localhost:1234/'
    this.myApiUrl = 'api/residente'
   }
   getAllResidente(): Observable<Residente[]>{
    return this.http.get<Residente[]>(`${this.myAppUrl}${this.myApiUrl}/`)
   }

   getById(id: number): Observable<Residente[]>{
    return this.http.get<Residente[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }

   agregar(Residente:Residente): Observable<Residente[]>{
    return this.http.post<Residente[]>(`${this.myAppUrl}${this.myApiUrl}/`, Residente)
   }

   updateResidente(id: number, Residente: Residente): Observable<void>{
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, Residente)
   }
   deleteResidente(id:number) :Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movimiento } from '../interfaces/movimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private myAppUrl: string
  private myApiUrl: string
  constructor(private http:HttpClient) {
    this.myAppUrl = 'http://localhost:1234/'
    this.myApiUrl = 'api/movimiento'
   }
   getAllMovimiento(): Observable<Movimiento[]>{
    return this.http.get<Movimiento[]>(`${this.myAppUrl}${this.myApiUrl}/`)
   }

   getById(id: number): Observable<Movimiento[]>{
    return this.http.get<Movimiento[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }

   agregar(Movimiento:Movimiento): Observable<Movimiento[]>{
    return this.http.post<Movimiento[]>(`${this.myAppUrl}${this.myApiUrl}/`, Movimiento)
   }

   updateMovimiento(id: number, Movimiento: Movimiento): Observable<void>{
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, Movimiento)
   }
   deleteMovimiento(id:number) :Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }
}

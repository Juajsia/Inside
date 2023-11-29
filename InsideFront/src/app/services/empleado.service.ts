import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private myAppUrl: string
  private myApiUrl: string
  constructor(private http:HttpClient) {
    this.myAppUrl = 'http://localhost:1234/'
    this.myApiUrl = 'api/empleado'
   }

   getAllEmpleado(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.myAppUrl}${this.myApiUrl}/`)
   }

   getById(id: number): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }

   agregar(Empleado:Empleado): Observable<Empleado[]>{
    return this.http.post<Empleado[]>(`${this.myAppUrl}${this.myApiUrl}/`, Empleado)
   }

   updateEmpleado(id: number, Empleado: Empleado): Observable<void>{
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, Empleado)
   }
   deleteEmpleado(id:number) :Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }
}

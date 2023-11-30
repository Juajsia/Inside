import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private myAppUrl: string
  private myApiUrl: string
  constructor(private http:HttpClient) {
    this.myAppUrl = 'http://localhost:1234/'
    this.myApiUrl = 'api/person'
   }

   getAllPersona(): Observable<Persona[]>{
    return this.http.get<Persona[]>(`${this.myAppUrl}${this.myApiUrl}/`)
   }

   getById(id: number): Observable<Persona[]>{
    return this.http.get<Persona[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }

   agregar(Persona:Persona): Observable<Persona[]>{
    return this.http.post<Persona[]>(`${this.myAppUrl}${this.myApiUrl}/`, Persona)
   }

   updatePersona(id: number, Persona: Persona): Observable<void>{
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, Persona)
   }
   deletePersona(id:number) :Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }
}

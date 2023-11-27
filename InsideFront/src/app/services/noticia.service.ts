import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Noticia } from '../interfaces/noticia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private myAppUrl: string
  private myApiUrl: string
  constructor(private http:HttpClient) {
    this.myAppUrl = 'http://localhost:1234/'
    this.myApiUrl = 'api/noticia'
   }

   getAllNoticias(): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(`${this.myAppUrl}${this.myApiUrl}/`)
   }

   getById(id: number): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }

   agregar(Noticia:Noticia): Observable<Noticia[]>{
    return this.http.post<Noticia[]>(`${this.myAppUrl}${this.myApiUrl}/`, Noticia)
   }

   updateNoticia(id: number, Noticia: Noticia): Observable<void>{
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, Noticia)
   }
   deleteNoticia(id:number) :Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }
}

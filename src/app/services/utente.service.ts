import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utente } from '../models/utente.models';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private apiUrl = 'http://localhost:8080/api/utenti';

  constructor(private http: HttpClient) {}

  getUtenti(): Observable<Utente[]> {
    return this.http.get<Utente[]>(this.apiUrl);
  }

  getUtenteById(id: number): Observable<Utente> {
    return this.http.get<Utente>(`${this.apiUrl}/${id}`);
  }

  addUtente(utente: Utente): Observable<Utente> {
    return this.http.post<Utente>(this.apiUrl, utente);
  }

  deleteUtente(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/utenti/${id}`);
  }
}

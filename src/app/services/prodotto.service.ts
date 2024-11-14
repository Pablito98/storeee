import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prodotto } from './../models/prodotto.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {
  private apiUrl = 'http://localhost:8080/api/prodotti';

  constructor(private http: HttpClient) {}

  getProdotti(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(this.apiUrl);
  }

  getProdottoById(id: number): Observable<Prodotto> {
    return this.http.get<Prodotto>(`${this.apiUrl}/${id}`);
  }

  addProdotto(prodotto: Prodotto): Observable<Prodotto> {
    return this.http.post<Prodotto>(this.apiUrl, prodotto);
  }

  deleteProdotto(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/prodotti/${id}`);
  }
}

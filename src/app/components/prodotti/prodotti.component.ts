import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdottoService } from '../../services/prodotto.service';
import { Prodotto } from '../../models/prodotto.models';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-prodotti',
  standalone: true,
  
  imports: [FormsModule, CommonModule,HttpClientModule],
  template: `<!-- prodotti.component.html -->
  <div class="container">
    <!-- Error message -->
    <div *ngIf="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
  
    <!-- Loading indicator -->
    <div *ngIf="loading" class="loading-overlay">
      <span class="spinner"></span> Caricamento in corso...
    </div>
  
    <div class="row">
      <!-- Product list -->
      <div *ngFor="let prodotto of prodotti" class="col-md-4 product-card">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ prodotto.nomeProdotto }}</h5>
            <p class="card-text">{{ prodotto.descrizioneProdotto }}</p>
            <p class="price">€ {{ prodotto.prezzo }}</p>
            <p class="rating">Valutazione: {{ prodotto.valutazione }} / 5</p>
            <button class="btn btn-danger" (click)="eliminaProdotto(prodotto.id)">Elimina</button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Add Product Form -->
    <div class="add-product-form mt-5">
      <h3>Aggiungi Nuovo Prodotto</h3>
      <form (ngSubmit)="aggiungiProdotto()">
        <div class="form-group">
          <label for="nomeProdotto">Nome Prodotto</label>
          <input type="text" id="nomeProdotto" class="form-control" [(ngModel)]="nuovoProdotto.nomeProdotto" name="nomeProdotto" required />
        </div>
        <div class="form-group">
          <label for="tipoProdotto">Tipo Prodotto</label>
          <input type="text" id="tipoProdotto" class="form-control" [(ngModel)]="nuovoProdotto.tipoProdotto" name="tipoProdotto" />
        </div>
        <div class="form-group">
          <label for="descrizioneProdotto">Descrizione</label>
          <textarea id="descrizioneProdotto" class="form-control" [(ngModel)]="nuovoProdotto.descrizioneProdotto" name="descrizioneProdotto" required></textarea>
        </div>
        <div class="form-group">
          <label for="prezzo">Prezzo (€)</label>
          <input type="number" id="prezzo" class="form-control" [(ngModel)]="nuovoProdotto.prezzo" name="prezzo" required min="0" />
        </div>
        <div class="form-group">
          <label for="valutazione">Valutazione (0-5)</label>
          <input type="number" id="valutazione" class="form-control" [(ngModel)]="nuovoProdotto.valutazione" name="valutazione" min="0" max="5" />
        </div>
        <button type="submit" class="btn btn-primary mt-3">Aggiungi Prodotto</button>
      </form>
    </div>
  </div>
  `,
  styleUrls: ['./prodotti.component.css'],
  providers: [ProdottoService]
})
export class ProdottiComponent implements OnInit {
  prodotti: Prodotto[] = [];
  nuovoProdotto: Prodotto = { 
    nomeProdotto: "", 
    tipoProdotto: "", 
    descrizioneProdotto: "", 
    prezzo: 0, 
    valutazione: 0 
  }; // Fix: Assign default values for prezzo and valutazione
  loading: boolean = true; // Variabile per il caricamento
  errorMessage: string | null = null; // Messaggio di errore

  constructor(private prodottoService: ProdottoService) {}

  ngOnInit() {
    this.caricaProdotti(); // Carica i prodotti all'inizializzazione
  }

  // Metodo per caricare i prodotti dall'API
  caricaProdotti() {
    this.prodottoService.getProdotti().subscribe({
      next: (data) => {
        this.prodotti = data; // Assuming the response contains the list of products
        this.loading = false; // Nasconde "Caricamento in corso..."
      },
      error: (err) => {
        console.error('Errore nel recupero dei prodotti:', err);
        this.loading = false; // Nasconde "Caricamento in corso..." anche in caso di errore
        this.errorMessage = 'Errore nel recupero dei prodotti. Riprova più tardi.';
      }
    });
  }

  // Metodo per aggiungere un nuovo prodotto
  aggiungiProdotto() {
    if (this.nuovoProdotto.nomeProdotto && this.nuovoProdotto.prezzo && this.nuovoProdotto.descrizioneProdotto) {
      this.prodottoService.addProdotto(this.nuovoProdotto).subscribe({
        next: (prodotto) => {
          this.prodotti.push(prodotto); // Aggiungi il prodotto alla lista locale
          this.nuovoProdotto = { nomeProdotto: "", tipoProdotto: "", descrizioneProdotto: "", prezzo: 0, valutazione: 0 }; // Reset del form
        },
        error: (err) => {
          console.error('Errore durante l\'aggiunta del prodotto:', err);
          this.errorMessage = 'Errore durante l\'aggiunta del prodotto. Riprova.';
        }
      });
    } else {
      this.errorMessage = 'Compila tutti i campi per aggiungere un nuovo prodotto.';
    }
  }

  // Metodo per eliminare un prodotto
  eliminaProdotto(id?: number) {
    if (id) {
      this.prodottoService.deleteProdotto(id).subscribe({
        next: () => {
          this.prodotti = this.prodotti.filter((p) => p.id !== id);
        },
        error: (err) => {
          console.error('Errore durante l\'eliminazione del prodotto:', err);
          this.errorMessage = 'Errore durante l\'eliminazione del prodotto. Riprova.';
        }
      });
    }
  }
}

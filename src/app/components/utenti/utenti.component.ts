import { Component, OnInit } from '@angular/core';
import { UtenteService } from '../../services/utente.service'; // Modifica il percorso se necessario
import { Utente } from '../../models/utente.models'; // Modifica il percorso se necessario
import { FormsModule } from '@angular/forms'; // Importa FormsModule per ngModel
import { CommonModule } from '@angular/common'; // Importa CommonModule per le direttive Angular di base
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-utenti',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule], // Importa i moduli necessari per il template
  template: `
    <div class="container mt-5">
      <!-- Titolo della pagina -->
      <h2 class="text-center text-primary mb-4">Gestione Utenti</h2>

      <!-- Messaggio di caricamento -->
      <div *ngIf="loading" class="d-flex justify-content-center align-items-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Caricamento in corso...</span>
        </div>
        <p class="ms-3 text-muted">Caricamento in corso...</p>
      </div>

      <!-- Lista degli utenti -->
      <div *ngIf="!loading" class="row row-cols-1 row-cols-md-2 g-4">
        <div *ngFor="let utente of utenti" class="col">
          <div class="card shadow-sm border-light">
            <div class="card-body">
              <h5 class="card-title">{{ utente.nome }}</h5>
              <p class="card-text text-muted">{{ utente.cognome }}</p>
              <p class="card-text text-muted">{{ utente.email }}</p>
              <p class="card-text text-muted">
                {{ utente.dataNascita ? (utente.dataNascita | date: 'yyyy/MM/dd') : 'Data non disponibile' }}
              </p>
              <button (click)="eliminaUtente(utente.id)" class="btn btn-danger">
                <i class="bi bi-trash"></i> Elimina
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Form per aggiungere nuovi utenti -->
      <div class="mt-5">
        <h4>Aggiungi Nuovo Utente</h4>
        <form (ngSubmit)="aggiungiUtente()" class="row g-3">
          <div class="col-md-6">
            <input [(ngModel)]="nuovoUtente.nome" type="text" placeholder="Nome" name="nome" required class="form-control">
          </div>
          <div class="col-md-6">
            <input [(ngModel)]="nuovoUtente.email" type="email" placeholder="Email" name="email" required class="form-control">
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-success w-100">Aggiungi Utente</button>
          </div>
        </form>
      </div>

      <!-- Messaggio di errore -->
      <div *ngIf="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
    </div>
  `,
  providers: [UtenteService], // Fornisce UtenteService a questo componente standalone
})
export class UtentiComponent implements OnInit {
  utenti: Utente[] = []; // Lista degli utenti caricati
  nuovoUtente: Utente = { nome: '', cognome: '', email: '', dataNascita: new Date() }; // Nuovo utente vuoto per il form
  loading: boolean = true; // Variabile per il caricamento
  errorMessage: string | null = null; // Messaggio di errore

  constructor(private utenteService: UtenteService) {}

  ngOnInit() {
    this.caricaUtenti(); // Carica gli utenti all'inizializzazione
  }

  // Metodo per caricare gli utenti dall'API
  caricaUtenti() {
    this.utenteService.getUtenti().subscribe({
      next: (data) => {
        // Assicurati che la dataNascita sia un oggetto Date
        this.utenti = data.map(utente => ({
          ...utente,
          dataNascita: new Date(utente.dataNascita) // Converte la data in un oggetto Date se necessario
        }));
        this.loading = false; // Nasconde "Caricamento in corso..."
      },
      error: (err) => {
        console.error('Errore nel recupero degli utenti:', err);
        this.loading = false; // Nasconde "Caricamento in corso..." anche in caso di errore
        this.errorMessage = 'Errore nel recupero degli utenti. Riprova più tardi.';
      }
    });
  }

  // Metodo per aggiungere un nuovo utente
  aggiungiUtente() {
    if (this.nuovoUtente.nome && this.nuovoUtente.email) {
      this.utenteService.addUtente(this.nuovoUtente).subscribe({
        next: (utente) => {
          // Assicurati che la dataNascita sia un oggetto Date
          utente.dataNascita = new Date(utente.dataNascita); // Converte la data in un oggetto Date
          this.utenti.push(utente); // Aggiungi l'utente alla lista locale
          this.nuovoUtente = { nome: '', cognome: '', email: '', dataNascita: new Date() }; // Reset del form
        },
        error: (err) => {
          console.error('Errore durante l\'aggiunta dell\'utente:', err);
          this.errorMessage = 'Errore durante l\'aggiunta dell\'utente. Riprova.';
        }
      });
    } else {
      this.errorMessage = 'Compila tutti i campi per aggiungere un nuovo utente.';
    }
  }

  // Metodo per eliminare un utente
  eliminaUtente(id?: number) {
    if (id) {
      this.utenteService.deleteUtente(id).subscribe({
        next: () => {
          this.utenti = this.utenti.filter((u) => u.id !== id);
        },
        error: (err) => {
          console.error('Errore durante l\'eliminazione dell\'utente:', err);
          this.errorMessage = 'Errore durante l\'eliminazione dell\'utente. Riprova.';
        }
      });
    }
  }
}

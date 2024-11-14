import { Component } from '@angular/core';
import { UtentiComponent } from './components/utenti/utenti.component'; // Importa UtentiComponent
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { ProdottiComponent } from './components/prodotti/prodotti.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UtentiComponent,HttpClientModule,RouterModule,RouterLink,ProdottiComponent], 
  templateUrl: './app.component.html',
})
export class AppComponent {}

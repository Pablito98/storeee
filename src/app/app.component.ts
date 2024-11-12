import { Component } from '@angular/core';
import { UtentiComponent } from './components/utenti/utenti.component'; // Importa UtentiComponent
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UtentiComponent,HttpClientModule], // Importa UtentiComponent per renderlo disponibile nel template
  template: `
    <app-utenti></app-utenti> <!-- Utilizza il componente UtentiComponent -->
  `,
})
export class AppComponent {}

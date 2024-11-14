import { Routes } from '@angular/router';
import { UtentiComponent } from './components/utenti/utenti.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';

export const routes: Routes = [
    { path: 'utenti', component: UtentiComponent },
    { path: 'prodotti', component: ProdottiComponent },
    { path: '', redirectTo: '/utenti', pathMatch: 'full' }
    ];

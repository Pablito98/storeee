import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importa withFetch
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';


import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes) // Configura HttpClient per usare fetch
  ]
}).catch(err => console.error(err));

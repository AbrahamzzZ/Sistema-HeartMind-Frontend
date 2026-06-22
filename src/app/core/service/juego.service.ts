import { inject, Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Juego {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${ENV.apiUrl}/juegos.routes.php`;

  obtenerJuegos(): Observable<Juego[]> {
    return this.http.get<Juego[]>(`${this.apiUrl}?listar=1`);
  }

  obtenerJuego(codigo: string): Observable<Juego> {
    return this.http.get<Juego>(`${this.apiUrl}?juego=${codigo}`);
  }
}

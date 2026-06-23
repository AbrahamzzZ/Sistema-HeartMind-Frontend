import { inject, Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Juego } from '../interface/contenido/juego/juego';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  private readonly http = inject(HttpClient);

  obtenerJuegos(): Observable<any> {
    return this.http.get<any>(`${ENV.apiUrl}?ruta=juegos&listar`);
  }

  obtenerJuego(codigo: string): Observable<Juego> {
    return this.http.get<Juego>(`${ENV.apiUrl}?juego=${codigo}`);
  }
}

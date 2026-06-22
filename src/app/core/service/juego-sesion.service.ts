import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../../environments/environment';
import { FinalizarJuegoRequest } from '../interface/contenido/juego/finalizarJuegoRequest';
import { IniciarJuegoRequest } from '../interface/contenido/juego/iniciarJuegoRequest';

@Injectable({
  providedIn: 'root',
})
export class JuegoSesion {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${ENV.apiUrl}/juegos.routes.php`;

  iniciarJuego(request: IniciarJuegoRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}?accion=iniciar`, request);
  }

  finalizarJuego(request: FinalizarJuegoRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}?accion=finalizar`, request);
  }
}

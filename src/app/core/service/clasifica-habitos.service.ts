import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../../environments/environment';
import { CrearClasificaHabitosRequest } from '../interface/contenido/juego/crearClasificacionHabitosRequest';

@Injectable({
  providedIn: 'root',
})
export class ClasificaHabitos {
  private readonly http = inject(HttpClient);

  obtenerDatosJuego(juegoId: number): Observable<any> {
    return this.http.get(`${ENV.apiUrl}?ruta=juegos&clasifica_id=${juegoId}`);
  }

  crearJuegoCompleto(request: CrearClasificaHabitosRequest): Observable<any> {
    return this.http.post(`${ENV.apiUrl}?accion=clasifica-crear-completo`, request);
  }

  actualizarJuegoCompleto(request: CrearClasificaHabitosRequest): Observable<any> {
    return this.http.post(`${ENV.apiUrl}?accion=clasifica-actualizar-completo`, request);
  }
}

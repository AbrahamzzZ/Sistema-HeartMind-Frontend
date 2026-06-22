import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment as ENV } from "../../../environments/environment";
import { CrearMemoriaRequest } from "../interface/contenido/juego/crearMemoriaRequest";

@Injectable({
  providedIn: 'root'
})
export class MemoriaCardiacaService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${ENV.apiUrl}/juegos.routes.php`;

  obtenerCartas(juegoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?memoria_id=${juegoId}`);
  }

  crearJuegoCompleto(request: CrearMemoriaRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}?accion=memoria-crear-completo`, request);
  }

  actualizarJuegoCompleto(request: CrearMemoriaRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}?accion=memoria-actualizar-completo`, request);
  }
}
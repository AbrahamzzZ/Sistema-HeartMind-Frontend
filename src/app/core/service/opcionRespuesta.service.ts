import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { OpcionRespuesta } from '../interface/cuestionario/opcionRespuesta';

@Injectable({
  providedIn: 'root',
})
export class OpcionRespuestaService {

  private readonly http = inject(HttpClient);

  crear(opcion: OpcionRespuesta): Observable<any> {
    return this.http.post(`${ENV.apiUrl}?ruta=cuestionarios&accion=crear-opcion`, opcion);
  }

  actualizar(opcion: OpcionRespuesta): Observable<any> {
    return this.http.put(`${ENV.apiUrl}?ruta=cuestionarios&accion=actualizar-opcion`, opcion);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${ENV.apiUrl}?ruta=cuestionarios&accion=eliminar-opcion&id=${id}`);
  }
}
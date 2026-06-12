import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvaluacionRiesgo } from '../interface/evaluacion/evaluacionRiesgo';
import { environment as ENV } from '../../../environments/environment';
import { ApiResponse } from '../interface/apiResponse';
import { HistorialEvaluacion } from '../interface/evaluacion/historialEvaluacion';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionRiesgoService {
  private readonly http = inject(HttpClient);

  registrar(evaluacion: EvaluacionRiesgo): Observable<any> {
    return this.http.post<ApiResponse<EvaluacionRiesgo>>(`${ENV.apiUrl}?ruta=evaluaciones`, evaluacion);
  }

  obtenerHistorial(usuarioId: number): Observable<ApiResponse<EvaluacionRiesgo[]>> {
    return this.http.get<ApiResponse<EvaluacionRiesgo[]>>(`${ENV.apiUrl}?ruta=evaluaciones&usuarioId=${usuarioId}`);
  }

  obtenerHistoriales(): Observable<ApiResponse<HistorialEvaluacion[]>> {
    return this.http.get<ApiResponse<HistorialEvaluacion[]>>(`${ENV.apiUrl}?ruta=evaluaciones&todos=true`);
  }
}
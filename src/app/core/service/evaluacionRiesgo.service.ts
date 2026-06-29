import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvaluacionRiesgo } from '../interface/evaluacion/evaluacionRiesgo';
import { HistorialEvaluacion } from '../interface/evaluacion/historialEvaluacion';
import { environment as ENV } from '../../../environments/environment';
import { ApiResponse } from '../interface/apiResponse';
import { EvaluacionResultado } from '../interface/evaluacion/evaluacionResultado';

@Injectable({
    providedIn: 'root',
})
export class EvaluacionRiesgoService {
  private readonly http = inject(HttpClient);

  evaluar(evaluacion: EvaluacionRiesgo): Observable<ApiResponse<EvaluacionResultado>> {
    return this.http.post<ApiResponse<EvaluacionResultado>>(`${ENV.apiUrl}?ruta=evaluaciones`, evaluacion);
  }

  obtenerHistorial(usuarioId: number): Observable<ApiResponse<HistorialEvaluacion[]>> {
    return this.http.get<ApiResponse<HistorialEvaluacion[]>>(`${ENV.apiUrl}?ruta=evaluaciones&usuarioId=${usuarioId}`);
  }

  obtenerHistoriales(): Observable<ApiResponse<HistorialEvaluacion[]>> {
    return this.http.get<ApiResponse<HistorialEvaluacion[]>>(`${ENV.apiUrl}?ruta=evaluaciones&todos=true`);
  }
}

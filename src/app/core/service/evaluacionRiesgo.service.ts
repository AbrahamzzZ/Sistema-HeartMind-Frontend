import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvaluacionRiesgo } from '../interface/evaluacionRiesgo';
import { environment as ENV } from '../../../environments/environment';
import { ApiResponse } from '../interface/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionRiesgoService {
    private readonly http = inject(HttpClient);

    registrar(evaluacion: EvaluacionRiesgo): Observable<any> {
        return this.http.post<ApiResponse<EvaluacionRiesgo>>(`${ENV.apiUrl}?ruta=evaluaciones`, evaluacion);
    }
}
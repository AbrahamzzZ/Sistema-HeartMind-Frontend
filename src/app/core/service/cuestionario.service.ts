import { inject, Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/apiResponse';
import { Cuestionario } from '../interface/cuestionario/cuestionario';
import { ResultadoCuestionario } from '../interface/cuestionario/resultadoCuestionario';
import { ResultadoResolverCuestionario } from '../interface/cuestionario/resultadoResolverCuestionario';
import { CuestionarioCompleto } from '../interface/cuestionario/cuestionarioCompleto';

@Injectable({
  providedIn: 'root',
})
export class CuestionarioService {
  private readonly http = inject(HttpClient);

  listar(): Observable<ApiResponse<Cuestionario[]>> {
    return this.http.get<ApiResponse<Cuestionario[]>>(`${ENV.apiUrl}?ruta=cuestionarios`);
  }

  obtenerPorId(id: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${ENV.apiUrl}?ruta=cuestionarios&id=${id}`);
  }

  obtenerHistorial(usuarioId: number): Observable<ApiResponse<ResultadoCuestionario[]>> {
    return this.http.get<ApiResponse<ResultadoCuestionario[]>>(`${ENV.apiUrl}?ruta=cuestionarios&usuarioId=${usuarioId}`);
  }

  resolver( data: { usuarioId: number; cuestionarioId: number; respuestas: any[]; }): Observable<ApiResponse<ResultadoResolverCuestionario>> {
    return this.http.post<ApiResponse<ResultadoResolverCuestionario>>(`${ENV.apiUrl}?ruta=cuestionarios&accion=resolver`, data);
  }

  crear(cuestionario: Cuestionario): Observable<any> {
    return this.http.post(`${ENV.apiUrl}?ruta=cuestionarios&accion=crear-cuestionario`, cuestionario);
  }

  crearCompleto(data: CuestionarioCompleto): Observable<any> {
    return this.http.post(`${ENV.apiUrl}?ruta=cuestionarios&accion=crear-completo`, data);
  }

  actualizar(cuestionario: Cuestionario): Observable<any> {
    return this.http.put(`${ENV.apiUrl}?ruta=cuestionarios&accion=actualizar-cuestionario`, cuestionario);
  }

  actualizarCompleto(data: any): Observable<any> {
    return this.http.put(`${ENV.apiUrl}?ruta=cuestionarios&accion=actualizar-completo`, data);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${ENV.apiUrl}?ruta=cuestionarios&accion=eliminar-cuestionario&id=${id}`);
  }
}

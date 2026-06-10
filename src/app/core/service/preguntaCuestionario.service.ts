import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../../environments/environment';
import { PreguntaCuestionario } from '../interface/preguntaCuestionario';

@Injectable({
  providedIn: 'root',
})
export class PreguntaCuestionarioService {
    private readonly http = inject(HttpClient);

    crear( pregunta: PreguntaCuestionario): Observable<any> {
        return this.http.post(`${ENV.apiUrl}?ruta=cuestionarios&accion=crear-pregunta`, pregunta);
    }

    actualizar( pregunta: PreguntaCuestionario): Observable<any> {
        return this.http.put(`${ENV.apiUrl}?ruta=cuestionarios&accion=actualizar-pregunta`, pregunta);
    }

    eliminar(id: number): Observable<any> {
        return this.http.delete(`${ENV.apiUrl}?ruta=cuestionarios&accion=eliminar-pregunta&id=${id}`);
    }
}
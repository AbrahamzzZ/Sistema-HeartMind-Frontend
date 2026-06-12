import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Contenido } from '../interface/contenido/contenido';
import { environment as ENV } from '../../../environments/environment';
import { ApiResponse } from '../interface/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class ContenidoService {
  private readonly http = inject(HttpClient);
  
  lista(){
    return this.http.get<ApiResponse<Contenido[]>>(`${ENV.apiUrl}?ruta=contenidos`);
  }

  obtenerContenido(id: number){
    return this.http.get<ApiResponse<Contenido>>(`${ENV.apiUrl}?ruta=contenidos&id=${id}`);
  }

  registrar(contenido: Contenido){
    return this.http.post<ApiResponse<null>>(`${ENV.apiUrl}?ruta=contenidos`, contenido);
  }

  editar(contenido: Contenido){
    return this.http.put(`${ENV.apiUrl}?ruta=contenidos`, contenido);
  }

  eliminar(id: number){
    return this.http.delete<ApiResponse<null>>(`${ENV.apiUrl}?ruta=contenidos&id=${id}`);
  }
}

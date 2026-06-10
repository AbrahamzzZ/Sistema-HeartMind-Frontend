import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { Usuario } from '../interface/usuario';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/apiResponse';
import { LoginResponse } from '../interface/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly http = inject(HttpClient);

  registrar( usuario: Usuario): Observable<any> {
    return this.http.post<ApiResponse<null>>(`${ENV.apiUrl}?ruta=usuarios&accion=registro`, usuario);
  }

  login( correo: string, contrasena: string): Observable<any> {
    return this.http.post<ApiResponse<LoginResponse>>(`${ENV.apiUrl}?ruta=usuarios&accion=login`,{ correo, contrasena });
  }

  obtener(): Observable<any> {
    return this.http.get(`${ENV.apiUrl}?ruta=usuarios&accion=perfil`);
  }
}
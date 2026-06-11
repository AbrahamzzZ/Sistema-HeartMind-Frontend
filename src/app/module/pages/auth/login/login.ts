import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../../core/service/usuario.service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit{
  public formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly usuarioService = inject(UsuarioService);
  public ocultarClave = true;

  public formLogin = this.formBuilder.nonNullable.group({
    usuario:['', [Validators.required, Validators.email]],
    clave:['', [Validators.required]]
  });

  get usuario() { return this.formLogin.get('usuario'); }
  get clave() { return this.formLogin.get('clave'); }

  ngOnInit(): void {
    const savedUser = localStorage.getItem('savedUser');
    if (savedUser) {
      this.formLogin.patchValue({ usuario: savedUser });
    }
  }

  login() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos requeridos.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    const correo = this.formLogin.value.usuario!;
    const contrasena = this.formLogin.value.clave!;

    this.usuarioService.login(correo, contrasena).subscribe({
      next: (resp) => {
        // Limpiar antes de setear
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        if (!resp || !resp.success) {
          Swal.fire({
            icon: 'error',
            title: 'Usuario o contraseña incorrectos',
            text: resp?.message || 'Verifica tus credenciales e intenta nuevamente.',
            confirmButtonColor: '#d33'
          });
          return;
        }

        const data = resp.data;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.usuario));

        this.router.navigate(['/home/tray']);
      },
      error: (err) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: err.error?.message || 'No se pudo contactar al servidor.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  registrar(){
    this.router.navigate(['/auth/registro']);
  }
}
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { MaterialModule } from '../../../../shared/ui/material-module';
import { UsuarioService } from '../../../../core/service/usuario.service';

@Component({
  selector: 'app-registro-usuario',
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './registro-usuario.html',
  styleUrl: './registro-usuario.scss',
})
export class RegistroUsuario {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly usuarioService = inject(UsuarioService);
  public ocultarClave = true;

  public formRegistro = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]],
    edad: [18, [Validators.required, Validators.min(1)]],
    genero: ['', Validators.required]
  });

  get nombre() {
    return this.formRegistro.get('nombre');
  }

  get correo() {
    return this.formRegistro.get('correo');
  }

  get contrasena() {
    return this.formRegistro.get('contrasena');
  }

  get edad() {
    return this.formRegistro.get('edad');
  }

  get genero() {
    return this.formRegistro.get('genero');
  }

  registrar(): void {

    if (this.formRegistro.invalid) {

      this.formRegistro.markAllAsTouched();

      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos.',
      });

      return;
    }

    this.usuarioService.registrar(this.formRegistro.getRawValue() as any)
      .subscribe({
        next: (resp) => {

          if (!resp.success) {

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: resp.message
            });

            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Tu cuenta ha sido creada correctamente.'
          }).then(() => {
            this.router.navigate(['/auth/login']);
          });
        },
        error: (err) => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error?.message ?? 'No se pudo registrar el usuario.'
          });
        }
      });
  }

  volverLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
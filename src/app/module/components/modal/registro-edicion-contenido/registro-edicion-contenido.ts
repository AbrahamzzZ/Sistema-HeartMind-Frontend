import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ContenidoService } from '../../../../core/service/contenido.service';
import { MaterialModule } from '../../../../shared/ui/material-module';

@Component({
  selector: 'app-registro-edicion-contenido',
  imports: [MaterialModule],
  templateUrl: './registro-edicion-contenido.html',
  styleUrl: './registro-edicion-contenido.scss',
})
export class RegistroEdicionContenido {
  private readonly fb = inject(FormBuilder);
  private readonly contenidoService = inject(ContenidoService);
  private readonly dialogRef = inject(
    MatDialogRef<RegistroEdicionContenido>
  );

  readonly data = inject(MAT_DIALOG_DATA, {
    optional: true
  });

  archivoSeleccionado: File | null = null;

  form = this.fb.nonNullable.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    tipo: ['video', Validators.required],
    categoria: ['', Validators.required],
    contenido: ['']
  });

  onArchivoSeleccionado(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.archivoSeleccionado = input.files[0];
  }

  guardar(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append(
      'titulo',
      this.form.controls.titulo.value
    );

    formData.append(
      'descripcion',
      this.form.controls.descripcion.value
    );

    formData.append(
      'tipo',
      this.form.controls.tipo.value
    );

    formData.append(
      'categoria',
      this.form.controls.categoria.value
    );

    formData.append(
      'contenido',
      this.form.controls.contenido.value ?? ''
    );

    if (this.archivoSeleccionado) {

      formData.append(
        'archivo',
        this.archivoSeleccionado
      );
    }

    this.contenidoService
      .registrar(formData as any)
      .subscribe({
        next: (resp) => {

          Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: resp.message
          });

          this.dialogRef.close(true);
        },
        error: (err) => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text:
              err.error?.message ??
              'No se pudo registrar el contenido.'
          });
        }
      });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  get esEdicion(): boolean {
    return !!this.data?.id;
  }
}

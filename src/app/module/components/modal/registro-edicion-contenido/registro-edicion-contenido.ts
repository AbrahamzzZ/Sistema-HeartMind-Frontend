import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { MaterialModule } from '../../../../shared/ui/material-module';
import { ContenidoService } from '../../../../core/service/contenido.service';
import { Contenido } from '../../../../core/interface/contenido/contenido';

@Component({
  selector: 'app-registro-edicion-contenido',
  imports: [MaterialModule],
  templateUrl: './registro-edicion-contenido.html',
  styleUrls: ['./registro-edicion-contenido.scss'],
})
export class RegistroEdicionContenido implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly contenidoService = inject(ContenidoService);
  private readonly dialogRef = inject(MatDialogRef<RegistroEdicionContenido>);
  readonly data = inject<Contenido | null>(MAT_DIALOG_DATA);
  archivoSeleccionado: File | null = null;
  esEdicion = false;
  dropZoneActive = false;
  acceptString = '.mp4';
  acceptedFileTypesLabel = 'MP4';
  fileErrorMessage = '';
  form = this.fb.group({
    id: [0],
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    tipo: ['video', Validators.required],
    categoria: ['', Validators.required],
    contenido: ['']
  });

  ngOnInit(): void {
    if (this.data) {
      this.esEdicion = true;
      this.form.patchValue({
        id: this.data.id,
        titulo: this.data.titulo,
        descripcion: this.data.descripcion,
        tipo: this.data.tipo,
        categoria: this.data.categoria
      });
    }

    this.configurarTipo();
    this.form.controls.tipo.valueChanges.subscribe(() => {
      this.archivoSeleccionado = null;
      this.fileErrorMessage = '';
      this.configurarTipo();
    });
  }

  configurarTipo(): void {
    const tipo = this.form.controls.tipo.value;
    if (tipo === 'video') {
      this.acceptString = '.mp4';
      this.acceptedFileTypesLabel = 'MP4';
    } else {
      this.acceptString = '.pdf,.doc,.docx';
      this.acceptedFileTypesLabel = 'PDF, DOC, DOCX';
    }
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    this.validarArchivo(input.files[0]);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dropZoneActive = true;
  }

  onDragLeave(): void {
    this.dropZoneActive = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dropZoneActive = false;
    const file = event.dataTransfer?.files?.[0];
    if (!file) {
      return;
    }
    this.validarArchivo(file);
  }

  validarArchivo(file: File): boolean {
    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
    const tipo = this.form.controls.tipo.value;
    const permitidos = tipo === 'video'
      ? ['mp4']
      : ['pdf', 'doc', 'docx'];

    if (!permitidos.includes(extension)) {
      this.archivoSeleccionado = null;
      this.fileErrorMessage = tipo === 'video'
        ? 'Solo se permiten archivos MP4.'
        : 'Solo se permiten archivos PDF, DOC o DOCX.';
      return false;
    }

    this.archivoSeleccionado = file;
    this.fileErrorMessage = '';
    return true;
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.esEdicion) {
      const tipo = this.form.controls.tipo.value;
      if (tipo === 'video' && !this.archivoSeleccionado) {
        this.fileErrorMessage = 'Debe seleccionar un video MP4 para continuar.';
        return;
      }
      if ((tipo === 'articulo' || tipo === 'infografia') && !this.archivoSeleccionado) {
        this.fileErrorMessage = 'Debe adjuntar un archivo PDF o Word para continuar.';
        return;
      }
    }

    if (this.archivoSeleccionado && !this.validarArchivo(this.archivoSeleccionado)) {
      return;
    }

    if (this.esEdicion) {
      this.actualizar();
    } else {
      this.registrar();
    }
  }

  registrar(): void {

    const formData = new FormData();

    formData.append(
      'titulo',
      this.form.controls.titulo.value ?? ''
    );

    formData.append(
      'descripcion',
      this.form.controls.descripcion.value ?? ''
    );

    formData.append(
      'tipo',
      this.form.controls.tipo.value ?? ''
    );

    formData.append(
      'categoria',
      this.form.controls.categoria.value ?? ''
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
              'No se pudo registrar.'
          });
        }
      });
  }

  actualizar(): void {

    const contenido: Contenido = {
      id: this.form.controls.id.value ?? 0,
      titulo: this.form.controls.titulo.value ?? '',
      descripcion: this.form.controls.descripcion.value ?? '',
      tipo: this.form.controls.tipo.value ?? '',
      categoria: this.form.controls.categoria.value ?? '',
      url: this.data?.url ?? ''
    };

    this.contenidoService
      .editar(contenido)
      .subscribe({
        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Contenido actualizado correctamente.'
          });

          this.dialogRef.close(true);
        },
        error: (err) => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text:
              err.error?.message ??
              'No se pudo actualizar.'
          });
        }
      });
  }

  cancelar(): void {

    this.dialogRef.close(false);
  }

  formatFileSize(size: number): string {
    if (size < 1024) {
      return `${size} bytes`;
    }
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }
}
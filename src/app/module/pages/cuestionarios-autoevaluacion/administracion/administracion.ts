import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuestionarioService } from '../../../../core/service/cuestionario.service';
import Swal from 'sweetalert2';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-administracion',
  standalone: false,
  templateUrl: './administracion.html',
  styleUrl: './administracion.scss',
})
export class Administracion implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly servicio = inject(CuestionarioService);
  private readonly router = inject(Router);

  id?: number;
  modoEdicion = false;

  cuestionario: any = {
    titulo: '',
    descripcion: '',
    preguntas: []
  };

  nuevaPregunta = '';
  opciones: string[] = ['', ''];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.id = Number(id);
      this.modoEdicion = true;

      this.servicio.obtenerPorId(this.id).subscribe({
        next: (resp) => {
          this.cuestionario = resp.data;
        }
      });
    }
  }

  agregarOpcion(): void {
    if (this.opciones.length >= 6) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Máximo 6 opciones por pregunta.'
      });
      return;
    }

    this.opciones.push('');
  }

  eliminarOpcion(index: number): void {
    this.opciones.splice(index, 1);
  }

  agregarPregunta(): void {

    if (!this.nuevaPregunta.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La pregunta no puede estar vacía.'
      });
      return;
    }

    const opcionesValidas = this.opciones
      .map(o => o.trim())
      .filter(o => o !== '');

    if (opcionesValidas.length < 2) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe haber al menos 2 opciones.'
      });
      return;
    }

    const pregunta = {
      pregunta: this.nuevaPregunta,
      opciones: opcionesValidas.map(o => ({
        texto_opcion: o,
        es_correcta: false
      }))
    };

    this.cuestionario.preguntas.push(pregunta);
    this.nuevaPregunta = '';
    this.opciones = ['', ''];
  }

  eliminarPregunta(index: number): void {
    this.cuestionario.preguntas.splice(index, 1);
  }

  guardar(): void {

    const request = this.modoEdicion
      ? this.servicio.actualizarCompleto(this.cuestionario)
      : this.servicio.crearCompleto(this.cuestionario);

    request.subscribe({
      next: () => {

        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: this.modoEdicion
            ? 'Cuestionario actualizado correctamente'
            : 'Cuestionario creado correctamente'
        });

        this.router.navigate(['/home/cuestionario']);
      },
      error: (err) => {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:
            err.error?.message ??
            'No se pudo procesar el cuestionario.'
        });
      }
    });
  }

  cancelar(): void {
    history.back();
  }

  drop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(
      this.cuestionario.preguntas,
      event.previousIndex,
      event.currentIndex
    );
  }

  trackByIndex(index: number): number {
    return index;
  }
}

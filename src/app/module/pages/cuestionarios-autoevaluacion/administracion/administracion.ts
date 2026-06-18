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
  //opciones: string[] = ['', ''];

  opciones: { texto_opcion: string; es_correcta: boolean;}[] = [
    {
      texto_opcion: '',
      es_correcta: true
    },
    {
      texto_opcion: '',
      es_correcta: false
    }
  ];

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

  eliminarPregunta(index: number): void {
    this.cuestionario.preguntas.splice(index, 1);
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

    this.opciones.push({
      texto_opcion: '',
      es_correcta: false
    });
  }

  eliminarOpcion(index: number): void {

    if (this.opciones.length <= 2) {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe existir al menos 2 opciones.'
      });

      return;
    }

    const eliminadaEraCorrecta =
      this.opciones[index].es_correcta;

    this.opciones.splice(index, 1);

    if (
      eliminadaEraCorrecta &&
      this.opciones.length > 0
    ) {
      this.opciones[0].es_correcta = true;
    }
  }

  seleccionarCorrecta(index: number): void {
    this.opciones.forEach((op, i) => {
      op.es_correcta = i === index;
    });
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

    const opcionesValidas = this.opciones.filter(o => o.texto_opcion.trim() !== '');
    if (opcionesValidas.length < 2) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe haber al menos 2 opciones.'
      });

      return;
    }

    const tieneCorrecta = opcionesValidas.some(o => o.es_correcta);

    if (!tieneCorrecta) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar una respuesta correcta.'
      });

      return;
    }

    const pregunta = {
      pregunta: this.nuevaPregunta,
      opciones: opcionesValidas.map(o => ({
        texto_opcion: o.texto_opcion,
        es_correcta: o.es_correcta
      }))
    };

    this.cuestionario.preguntas.push(pregunta);
    this.nuevaPregunta = '';
    this.opciones = [
      {
        texto_opcion: '',
        es_correcta: true
      },
      {
        texto_opcion: '',
        es_correcta: false
      }
    ];
  }

  obtenerOpcionCorrecta(pregunta: any): number | null {
    const correcta = pregunta.opciones.find(
      (o: any) =>
        o.es_correcta === 1 ||
        o.es_correcta === true
    );

    return correcta ? correcta.id : null;
  }

  guardar(): void {
    const request = this.modoEdicion ? this.servicio.actualizarCompleto(this.cuestionario) : this.servicio.crearCompleto(this.cuestionario);

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

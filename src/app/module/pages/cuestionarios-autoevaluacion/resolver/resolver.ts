import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CuestionarioService } from '../../../../core/service/cuestionario.service';

@Component({
  selector: 'app-resolver',
  standalone: false,
  templateUrl: './resolver.html',
  styleUrl: './resolver.scss',
})
export class Resolver implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly cuestionarioService = inject(CuestionarioService);
  private readonly router = inject(Router);

  cuestionario: any;

  respuestas: {
    preguntaId: number;
    opcionId: number;
  }[] = [];

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.cuestionarioService.obtenerPorId(id).subscribe({
      next: (resp) => {
        this.cuestionario = resp.data;
      },
      error: () => {
        Swal.fire(
          'Error',
          'No se pudo cargar el cuestionario',
          'error'
        );

        this.router.navigate(['/home/cuestionario']);
      }
    });
  }

  seleccionarRespuesta(
    preguntaId: number,
    opcionId: number
  ): void {

    const existente = this.respuestas.find(
      r => r.preguntaId === preguntaId
    );

    if (existente) {
      existente.opcionId = opcionId;
      return;
    }

    this.respuestas.push({
      preguntaId,
      opcionId
    });
  }

  enviar(): void {

    if (
      this.respuestas.length !==
      this.cuestionario.preguntas.length
    ) {
      Swal.fire(
        'Error',
        'Debe responder todas las preguntas.',
        'warning'
      );
      return;
    }

    this.cuestionarioService.resolver({
      usuarioId: 0,
      cuestionarioId: this.cuestionario.id,
      respuestas: this.respuestas
    }).subscribe({
      next: (resp) => {

        Swal.fire({
          icon: 'success',
          title: 'Resultado',
          html: `
            <b>Puntaje:</b>
            ${resp.data.puntaje}
            /
            ${this.cuestionario.preguntas.length}
          `
        });

      },
      error: (err) => {
        Swal.fire(
          'Error',
          err.error?.message ??
          'No se pudo resolver el cuestionario',
          'error'
        );
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/home/cuestionario']);
  }
}

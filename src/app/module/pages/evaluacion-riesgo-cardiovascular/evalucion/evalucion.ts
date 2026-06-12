import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EvaluacionRiesgoService } from '../../../../core/service/evaluacionRiesgo.service';

@Component({
  selector: 'app-evalucion',
  standalone: false,
  templateUrl: './evalucion.html',
  styleUrl: './evalucion.scss',
})
export class Evalucion {
  private readonly fb = inject(FormBuilder);
  private readonly evaluacionService = inject(EvaluacionRiesgoService);
  resultado: any = null;

  form = this.fb.nonNullable.group({
    edad: [0, [Validators.required, Validators.min(1)]],
    peso: [0, [Validators.required, Validators.min(1)]],
    altura: [0, [Validators.required, Validators.min(0.5)]],
    presionSistolica: [0, [Validators.required]],
    presionDiastolica: [0, [Validators.required]],
    nivelColesterol: [0, [Validators.required]],

    fumador: [false],
    diabetico: [false],
    actividadFisica: [false],
    antecedentesFamiliares: [false]
  });

  guardar(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuario = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    const payload = {
      usuarioId: usuario.id,
      ...this.form.getRawValue()
    };

    this.evaluacionService.registrar(payload as any)
      .subscribe({
        next: (resp) => {
          this.resultado = resp.data;

          Swal.fire({
            icon: 'success',
            title: 'Evaluación realizada',
            text: 'La evaluación fue procesada correctamente.'
          });
        },
        error: (err) => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error?.message ?? 'No se pudo procesar la evaluación.'
          });
        }
      });
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EvaluacionRiesgoService } from '../../../../core/service/evaluacionRiesgo.service';
import { LoaderService } from '../../../../core/service/loader.service';

@Component({
  selector: 'app-evalucion',
  standalone: false,
  templateUrl: './evalucion.html',
  styleUrl: './evalucion.scss',
})
export class Evalucion {
  private readonly fb = inject(FormBuilder);
  private readonly evaluacionService = inject(EvaluacionRiesgoService);
  private readonly loader = inject(LoaderService);
  resultado: any = null;
  loading$ = this.loader.loading$;

  form = this.fb.nonNullable.group({
    edad: [30, [Validators.required, Validators.min(1), Validators.max(120)]],
    peso: [70, [Validators.required, Validators.min(20), Validators.max(300)]],
    altura: [1.7, [Validators.required, Validators.min(0.5), Validators.max(2.5)]],
    presionSistolica: [120, [Validators.required, Validators.min(50), Validators.max(250)]],
    presionDiastolica: [80, [Validators.required, Validators.min(30), Validators.max(160)]],
    nivelColesterol: [180, [Validators.required, Validators.min(50), Validators.max(400)]],

    fumador: [false],
    diabetico: [false],
    actividadFisica: [false],
    antecedentesFamiliares: [false]
  });

  get edad() { return this.form.get('edad'); }
  get peso() { return this.form.get('peso'); }
  get altura() { return this.form.get('altura'); }
  get presionSistolica() { return this.form.get('presionSistolica'); }
  get presionDiastolica() { return this.form.get('presionDiastolica'); }
  get nivelColesterol() { return this.form.get('nivelColesterol'); }

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

  getImagenRiesgo(): string {
    if (!this.resultado) return '';

    switch (this.resultado.resultadoRiesgo) {
      case 'Bajo':
        return '/image/bajo.png';

      case 'Moderado':
        return '/image/moderado.png';

      case 'Alto':
        return '/image/alto.png';

      default:
        return '';
    }
  }
}

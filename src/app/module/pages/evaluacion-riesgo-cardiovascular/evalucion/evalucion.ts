import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EvaluacionRiesgoService } from '../../../../core/service/evaluacionRiesgo.service';
import { LoaderService } from '../../../../core/service/loader.service';
import { EvaluacionRiesgo } from '../../../../core/interface/evaluacion/evaluacionRiesgo';

@Component({
  selector: 'app-evaluacion',
  standalone: false,
  templateUrl: './evalucion.html',
  styleUrl: './evalucion.scss',
})
export class Evaluacion implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly evaluacionService = inject(EvaluacionRiesgoService);
  private readonly loader = inject(LoaderService);

  form!: FormGroup;
  resultado: any = null;
  loading$ = this.loader.loading$;

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.form = this.fb.group({
      edad: [30, [Validators.required, Validators.min(18), Validators.max(120)]],
      genero: [1, Validators.required],
      altura: [170, [Validators.required, Validators.min(100), Validators.max(220)]],
      peso: [70, [Validators.required, Validators.min(30), Validators.max(200)]],
      presionSistolica: [120, [Validators.required, Validators.min(80), Validators.max(200)]],
      presionDiastolica: [80, [Validators.required, Validators.min(40), Validators.max(130)]],
      nivelColesterol: [180, [Validators.required, Validators.min(50), Validators.max(400)]],
      glucosa: [1, Validators.required],
      fumador: [false],
      alcohol: [false],
      actividadFisica: [false]
    });
  }

  get edad() { return this.form.get('edad'); }
  get genero() { return this.form.get('genero'); }
  get altura() { return this.form.get('altura'); }
  get peso() { return this.form.get('peso'); }
  get presionSistolica() { return this.form.get('presionSistolica'); }
  get presionDiastolica() { return this.form.get('presionDiastolica'); }
  get nivelColesterol() { return this.form.get('nivelColesterol'); }
  get glucosa() { return this.form.get('glucosa'); }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor completa todos los campos requeridos.'
      });
      return;
    }

    const payload: EvaluacionRiesgo = {
      edad: this.form.value.edad,
      genero: this.form.value.genero,
      altura: this.form.value.altura,
      peso: this.form.value.peso,
      presionSistolica: this.form.value.presionSistolica,
      presionDiastolica: this.form.value.presionDiastolica,
      nivelColesterol: this.form.value.nivelColesterol,
      glucosa: this.form.value.glucosa,
      fumador: this.form.value.fumador,
      alcohol: this.form.value.alcohol,
      actividadFisica: this.form.value.actividadFisica
    };

    this.evaluacionService.evaluar(payload).subscribe({
      next: (resp) => {
        if (!resp.success) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: resp.message || 'No se pudo procesar la evaluación.'
          });
          return;
        }

        this.resultado = resp.data;

        Swal.fire({
          icon: 'success',
          title: 'Evaluación realizada',
          text: 'La evaluación fue procesada correctamente.'
        });

        setTimeout(() => {
          document.querySelector('.resultado-card')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
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

  reiniciar(): void {
    this.inicializarFormulario();
    this.resultado = null;
  }

  getImagenRiesgo(): string {
    if (!this.resultado) return '';

    switch (this.resultado.resultadoRiesgo) {
      case 'Bajo':
        return '/image/riesgo-bajo.png';
      case 'Moderado':
        return '/image/riesgo-moderado.png';
      case 'Alto':
        return '/image/riesgo-alto.png';
      default:
        return '';
    }
  }
}

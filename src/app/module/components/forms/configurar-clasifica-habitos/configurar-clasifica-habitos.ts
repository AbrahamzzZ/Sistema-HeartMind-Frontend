import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../shared/ui/material-module';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClasificaHabitos } from '../../../../core/service/clasifica-habitos.service';
import { JuegoService } from '../../../../core/service/juego.service';
import Swal from 'sweetalert2';
import { CrearClasificaHabitosRequest } from '../../../../core/interface/contenido/juego/crearClasificacionHabitosRequest';

@Component({
  selector: 'app-configurar-clasifica-habitos',
  imports: [MaterialModule],
  templateUrl: './configurar-clasifica-habitos.html',
  styleUrl: './configurar-clasifica-habitos.scss',
})
export class ConfigurarClasificaHabitos {

  private readonly fb = inject(FormBuilder);
  private readonly juegoService = inject(JuegoService);
  private readonly clasificaHabitosService = inject(ClasificaHabitos);

  juegoId?: number;

  form = this.fb.group({
    nombre: ['', Validators.required],
    codigo: ['', Validators.required],
    descripcion: [''],

    categorias: this.fb.array([]),
    items: this.fb.array([])
  });

  constructor() {
    this.agregarCategoria();
    this.agregarCategoria();

    this.agregarItem();
  }

  get categorias(): FormArray {
    return this.form.get('categorias') as FormArray;
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  agregarCategoria(): void {
    this.categorias.push(
      this.fb.group({
        nombre: ['', Validators.required]
      })
    );
  }

  eliminarCategoria(index: number): void {

    if (this.categorias.length <= 2) {
      return;
    }

    this.categorias.removeAt(index);
  }

  agregarItem(): void {
    this.items.push(
      this.fb.group({
        texto: ['', Validators.required],
        categoria_index: [0, Validators.required]
      })
    );
  }

  eliminarItem(index: number): void {
    this.items.removeAt(index);
  }

  guardar(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Complete todos los campos requeridos.'
      });

      return;
    }

    const juegoRequest = {
      nombre: this.form.value.nombre,
      codigo: this.form.value.codigo,
      descripcion: this.form.value.descripcion ?? '',
      tipo: 'clasifica_habitos'
    };

    this.juegoService
      .crearJuego(juegoRequest as any)
      .subscribe({
        next: (resp: any) => {

          const juegoId = resp.data?.id ?? resp.id;
          const request: CrearClasificaHabitosRequest = {
             juego_id: juegoId,
            categorias: this.categorias.controls.map(control => ({
              nombre: control.get('nombre')?.value
            })),

            items: this.items.controls.map(control => ({
              texto: control.get('texto')?.value,
              categoria_index: Number(
                control.get('categoria_index')?.value
              )
            }))
          };

          this.guardarConfiguracion(request);
        },

        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el juego.'
          });
        }
      });
  }

  private guardarConfiguracion(
    request: CrearClasificaHabitosRequest
  ): void {

    this.clasificaHabitosService
      .crearJuegoCompleto(request)
      .subscribe({
        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Juego configurado correctamente.'
          });

          this.form.reset();

          this.categorias.clear();
          this.items.clear();

          this.agregarCategoria();
          this.agregarCategoria();
          this.agregarItem();
        },

        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar la configuración.'
          });
        }
      });
  }
}
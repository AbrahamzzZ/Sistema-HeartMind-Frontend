import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../shared/ui/material-module';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClasificaHabitos } from '../../../../core/service/clasifica-habitos.service';
import { JuegoService } from '../../../../core/service/juego.service';
import Swal from 'sweetalert2';
import { CrearClasificaHabitosRequest } from '../../../../core/interface/contenido/juego/crearClasificacionHabitosRequest';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-configurar-clasifica-habitos',
  imports: [MaterialModule],
  templateUrl: './configurar-clasifica-habitos.html',
  styleUrl: './configurar-clasifica-habitos.scss',
})
export class ConfigurarClasificaHabitos implements OnInit {

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly juegoService = inject(JuegoService);
  private readonly clasificaHabitosService = inject(ClasificaHabitos);
  private readonly route = inject(ActivatedRoute);

  modoEdicion = false;
  juegoId?: number;
  private readonly categoriaIdMap: Map<string | number, number> = new Map();

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
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.modoEdicion = true;
      this.juegoId = Number(id);
      this.cargarJuego(this.juegoId);
    } else {
      this.agregarItem();
    }
  }

  get categorias(): FormArray {
    return this.form.get('categorias') as FormArray;
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  agregarCategoria(): void {
    const idTemporal = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    this.categorias.push(
      this.fb.group({
        id: [idTemporal],
        nombre: ['', Validators.required]
      })
    );
  }

  eliminarCategoria(index: number): void {
    if (this.categorias.length <= 2) return;
    this.categorias.removeAt(index);
  }

  agregarItem(): void {
    this.items.push(
      this.fb.group({
        texto: ['', Validators.required],
        categoria_correcta_id: [null, Validators.required]
      })
    );
  }

  eliminarItem(index: number): void {
    this.items.removeAt(index);
  }

  cargarJuego(id: number): void {
    this.clasificaHabitosService.obtenerDatosJuego(id).subscribe({
      next: (resp) => {
        const data = resp.data;
        this.form.patchValue({
          nombre: data.nombre,
          codigo: data.codigo,
          descripcion: data.descripcion
        });

        this.cargarCategorias(data.categorias);
        this.cargarItems(data.items);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los datos del juego'
        });
      }
    });
  }

  cargarCategorias(categorias: any[]): void {
    this.categorias.clear();
    this.categoriaIdMap.clear();

    categorias.forEach(cat => {
      this.categorias.push(
        this.fb.group({
          id: [cat.id],
          nombre: [cat.nombre, Validators.required]
        })
      );
      this.categoriaIdMap.set(cat.id, cat.id);
    });
  }

  cargarItems(items: any[]): void {
    const itemsArray = this.form.get('items') as FormArray;
    itemsArray.clear();

    items.forEach(item => {
      itemsArray.push(
        this.fb.group({
          texto: [item.texto, Validators.required],
          categoria_correcta_id: [item.categoria_correcta_id, Validators.required]
        })
      );
    });
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

    if (this.modoEdicion) {
      this.actualizar();
    } else {
      this.crear();
    }
  }

  crear(): void {

    const juegoRequest = {
      nombre: this.form.value.nombre,
      codigo: this.form.value.codigo,
      descripcion: this.form.value.descripcion ?? '',
      tipo: 'clasifica_habitos'
    };

    this.juegoService.crearJuego(juegoRequest as any).subscribe({
      next: (resp: any) => {
        const juegoId = resp.data?.id;
        const categoriaMap = new Map<string | number, number>();
        this.categorias.controls.forEach((control, index) => {
          const tempId = control.get('id')?.value;
          categoriaMap.set(tempId, index);
        });

        const request: CrearClasificaHabitosRequest = {
          juego_id: juegoId,
          categorias: this.categorias.controls.map(c => ({
            nombre: c.get('nombre')?.value
          })),
          items: this.items.controls.map(i => {
            const categoriaId = i.get('categoria_correcta_id')?.value;
            const indiceCategoria = categoriaMap.get(categoriaId);

            return {
              texto: i.get('texto')?.value,
              categoria_correcta_id: indiceCategoria ?? 0
            };
          })
        };

        this.clasificaHabitosService.crearJuegoCompleto(request).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Correcto',
              text: 'Juego creado correctamente'
            });

            this.router.navigate(['/home/contenido/juegos']);
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo guardar la configuración.'
            });
          }
        });
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

  actualizar(): void {
    const request: CrearClasificaHabitosRequest = {
      juego_id: this.juegoId!,
      categorias: this.categorias.controls.map(c => ({
        nombre: c.get('nombre')?.value
      })),
      items: this.items.controls.map(i => ({
        texto: i.get('texto')?.value,
        categoria_correcta_id: Number(i.get('categoria_correcta_id')?.value)
      }))
    };

    this.clasificaHabitosService.actualizarJuegoCompleto(request).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'Juego actualizado correctamente'
        });

        this.router.navigate(['/home/contenido/juegos']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el juego.'
        });
      }
    });
  }

  volver(): void {
    if (this.form.dirty) {

      Swal.fire({
        title: '¿Salir sin guardar?',
        text: 'Se perderán los cambios realizados.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Salir',
        cancelButtonText: 'Continuar editando'
      }).then(result => {
        if (result.isConfirmed) {
          this.router.navigate(['/home/contenido/juegos']);
        }
      });

      return;
    }

    this.router.navigate(['/home/contenido/juegos']);
  }
}
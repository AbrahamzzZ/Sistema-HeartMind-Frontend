import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { ClasificaHabitos } from '../../../../core/service/clasifica-habitos.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-juego-clasificar-habitos',
  standalone: false,
  templateUrl: './juego-clasificar-habitos.html',
  styleUrl: './juego-clasificar-habitos.scss',
})
export class JuegoClasificarHabitos implements OnInit {
  private readonly service = inject(ClasificaHabitos);
  private readonly route = inject(ActivatedRoute);
  categorias: any[] = [];
  pendientes: any[] = [];
  todasLasZonas: string[] = [];
  juegoId?: number;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.juegoId = Number(id);
    this.cargarJuego();
  }

  cargarJuego(): void {
    if (!this.juegoId) return;

    this.service.obtenerDatosJuego(this.juegoId)
      .subscribe({
        next: (response) => {

          this.categorias = response.data.categorias.map((c: any) => ({
            ...c,
            items: []
          }));

          this.todasLasZonas = [
            'pendientes',
            ...this.categorias.map((c: any) => `cat-${c.id}`)
          ];

          this.pendientes = response.data.items;
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los contenidos.'
          });
        }
      });
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  validar(): void {
    const itemsEnPendientes = this.pendientes.length;

    if (itemsEnPendientes > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Clasificación incompleta',
        text: `Faltan ${itemsEnPendientes} hábito(s) por clasificar`,
        confirmButtonText: 'Continuar',
        allowOutsideClick: false
      });
      return;
    }

    let correctos = 0;
    let total = 0;

    this.categorias.forEach(categoria => {
      categoria.items.forEach((item: any) => {
        total++;
        if (item.categoria_correcta_id === categoria.id) {
          correctos++;
        }
      });
    });

    const porcentaje = Math.round((correctos / total) * 100);
    let icon: 'success' | 'info' | 'warning';
    let titulo: string;
    
    if (porcentaje === 100) {
      icon = 'success';
      titulo = '¡Perfecto! 🎉';
    } else if (porcentaje >= 75) {
      icon = 'success';
      titulo = '¡Muy bien! 👏';
    } else if (porcentaje >= 50) {
      icon = 'info';
      titulo = 'Bien, casi lo tienes 💪';
    } else {
      icon = 'warning';
      titulo = 'Necesitas practicar más 📚';
    }

    Swal.fire({
      icon: icon,
      title: titulo,
      text: `${correctos}/${total} correctos`,
      confirmButtonText: 'Jugar de nuevo',
      allowOutsideClick: false
    }).then(() => {
      this.reiniciarJuego();
    });
  }

  reiniciarJuego(): void {
    this.cargarJuego();
  }
}
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { ClasificaHabitos } from '../../../../core/service/clasifica-habitos.service';

@Component({
  selector: 'app-juego-clasificar-habitos',
  standalone: false,
  templateUrl: './juego-clasificar-habitos.html',
  styleUrl: './juego-clasificar-habitos.scss',
})
export class JuegoClasificarHabitos implements OnInit {

  private readonly service = inject(ClasificaHabitos);

  categorias: any[] = [];
  pendientes: any[] = [];
  categoriasConectadas: string[] = [];

  ngOnInit(): void {
    this.cargarJuego();
  }

  cargarJuego(): void {

    this.service.obtenerDatosJuego(1)
      .subscribe({
        next: (response) => {

          this.categorias = response.data.categorias.map((c: any) => ({
            ...c,
            items: []
          }));

          this.categoriasConectadas = this.categorias.map(
            (c: any) => `cat-${c.id}`
          );

          this.pendientes = response.data.items;
        },
        error: (error) => {
          console.error(error);
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

    alert(`Resultado: ${correctos}/${total}`);
  }
}
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoService } from '../../../../core/service/juego.service';
import { Juego } from '../../../../core/interface/contenido/juego/juego';

@Component({
  selector: 'app-dashboard-juego',
  standalone: false,
  templateUrl: './dashboard-juego.html',
  styleUrl: './dashboard-juego.scss',
})
export class DashboardJuego implements OnInit {
  private readonly juegoService = inject(JuegoService);
  private readonly router = inject(Router);

  juegos: Juego[] = [];

  ngOnInit(): void {
    this.cargarJuegos();
  }

  cargarJuegos(): void {
    this.juegoService
      .obtenerJuegos()
      .subscribe({
        next: (resp) => {
          this.juegos = resp.data ?? [];
        }
      });

  }

  abrirJuego(juego: Juego): void {

    switch (juego.codigo) {

      case 'CLASIF_HAB_001':
        this.router.navigate([
          '/home/contenido/juegos/clasificar-habitos',
          juego.id
        ]);
        break;

      default:
        console.log('Juego no implementado');
    }

  }
}
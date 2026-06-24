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

  esAdministrador = false;
  juegos: Juego[] = [];

  ngOnInit(): void {
    const usuario = JSON.parse(
      localStorage.getItem('user') || '{}'
    );
    this.esAdministrador = usuario.rol === 'Administrador';
    this.cargarJuegos();
  }

  cargarJuegos(): void {
    this.juegoService
      .obtenerJuegos()
      .subscribe({
        next: (resp) => {
          this.juegos = resp.data ?? [];
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  crearJuego(): void {
    this.router.navigate(['/home/contenido/juegos/clasificar-habitos/configurar']);
  }

  configurarJuego(juego: Juego): void {
    if (juego.tipo === 'clasifica_habitos') {
      this.router.navigate(['/home/contenido/juegos/clasificar-habitos/configurar', juego.id]);
    } else {
      console.log('Configuración no implementada');
    }
  }

  abrirJuego(juego: Juego): void {
    if (juego.tipo === 'clasifica_habitos') {
      this.router.navigate(['/home/contenido/juegos/clasificar-habitos', juego.id]);
    } else {
      console.log('Juego no implementado');
    }
  }
}
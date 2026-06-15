import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from '../../../../core/service/loader.service';
import { CuestionarioService } from '../../../../core/service/cuestionario.service';
import { Cuestionario as ICuestionario } from '../../../../core/interface/cuestionario/cuestionario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuestionario',
  standalone: false,
  templateUrl: './cuestionario.html',
  styleUrl: './cuestionario.scss',
})
export class Cuestionario implements OnInit{
  private readonly loader = inject(LoaderService);
  loading$ = this.loader.loading$;
  private readonly router = inject(Router);
  private readonly cuestionarioService = inject(CuestionarioService);
  cuestionarios: ICuestionario[] = [];
  esAdministrador = false;

  ngOnInit(): void {
    const usuario = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    this.esAdministrador = usuario.rol === 'Administrador';
    this.listar();
  }

  listar(): void {
    this.cuestionarioService.listar().subscribe({
      next: (resp) => {
        this.cuestionarios = resp.data;
      }
    });
  }

  registrar(): void {
    this.router.navigate(['/home/cuestionario/administracion']);
  }

  editar(id: number): void {
    this.router.navigate(['/home/cuestionario/administracion', id]);
  }

  eliminar(id: number): void {
    console.log('eliminar', id);
  }

  resolver(id: number): void {
    console.log('resolver', id);
  }
}

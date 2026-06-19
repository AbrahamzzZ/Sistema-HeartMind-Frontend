import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from '../../../../core/service/loader.service';
import { CuestionarioService } from '../../../../core/service/cuestionario.service';
import { Cuestionario as ICuestionario } from '../../../../core/interface/cuestionario/cuestionario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

    Swal.fire({
      title: '¿Eliminar cuestionario?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33'
    }).then((result) => {

      if (!result.isConfirmed) {
        return;
      }

      this.cuestionarioService.eliminar(id).subscribe({
        next: (resp) => {

          Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: resp.message ?? 'Cuestionario eliminado correctamente.'
          });

          this.listar();
        },
        error: (err) => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error?.message ?? 'No se pudo eliminar el cuestionario.'
          });
        }
      });

    });
  }

  resolver(id: number): void {
    this.router.navigate(['/home/cuestionario/resolver', id]);
  }
}

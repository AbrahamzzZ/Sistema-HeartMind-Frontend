import { Component, inject, OnInit } from '@angular/core';
import { ContenidoService } from '../../../../core/service/contenido.service';
import { Contenido as ContenidoModel } from '../../../../core/interface/contenido/contenido';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { RegistroEdicionContenido } from '../../../components/modal/registro-edicion-contenido/registro-edicion-contenido';

@Component({
  selector: 'app-contenido',
  standalone: false,
  templateUrl: './contenido.html',
  styleUrl: './contenido.scss',
})
export class Contenido implements OnInit {
  private readonly contenidoService = inject(ContenidoService);
  private readonly dialog = inject(MatDialog);

  esAdministrador = false;
  contenidos: ContenidoModel[] = [];

  ngOnInit(): void {

    const usuario = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    this.esAdministrador =
      usuario.rol === 'Administrador';

    this.cargarContenidos();
  }

  cargarContenidos(): void {

    this.contenidoService
      .lista()
      .subscribe({
        next: (resp) => {
          this.contenidos = resp.data;
        }
      });
  }

  registrar(): void {

    const dialogRef = this.dialog.open(
      RegistroEdicionContenido,
      {
        width: '700px',
        disableClose: true,
        data: null
      }
    );

    dialogRef.afterClosed()
      .subscribe(resultado => {

        if (resultado) {
          this.cargarContenidos();
        }

      });
  }

  editar(contenido: ContenidoModel): void {

    const dialogRef = this.dialog.open(
      RegistroEdicionContenido,
      {
        width: '700px',
        disableClose: true,
        data: contenido
      }
    );

    dialogRef.afterClosed()
      .subscribe(resultado => {

        if (resultado) {
          this.cargarContenidos();
        }

      });
  }

  eliminar(id: number): void {

    Swal.fire({
      title: '¿Eliminar contenido?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true
    }).then(result => {

      if (result.isConfirmed) {

        this.contenidoService
          .eliminar(id)
          .subscribe({
            next: () => {

              Swal.fire(
                'Eliminado',
                'Contenido eliminado correctamente.',
                'success'
              );

              this.cargarContenidos();
            }
          });
      }
    });
  }
}
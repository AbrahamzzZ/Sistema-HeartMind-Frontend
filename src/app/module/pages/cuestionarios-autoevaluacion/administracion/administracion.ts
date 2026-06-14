import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuestionarioService } from '../../../../core/service/cuestionario.service';

@Component({
  selector: 'app-administracion',
  standalone: false,
  templateUrl: './administracion.html',
  styleUrl: './administracion.scss',
})
export class Administracion implements OnInit{
  private readonly route = inject(ActivatedRoute);
  private readonly servicio = inject(CuestionarioService);

  id?: number;
  modoEdicion = false;

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.id = Number(id);
      this.modoEdicion = true;
      this.servicio.obtenerPorId(this.id);
    }
  }
}

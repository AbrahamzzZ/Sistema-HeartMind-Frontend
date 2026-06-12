import { Component, inject, OnInit } from '@angular/core';
import { EvaluacionRiesgoService } from '../../../../core/service/evaluacionRiesgo.service';
import { HistorialEvaluacion } from '../../../../core/interface/evaluacion/historialEvaluacion';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-historial',
  standalone: false,
  templateUrl: './historial.html',
  styleUrl: './historial.scss',
})
export class Historial implements OnInit {

  private readonly evaluacionService = inject(EvaluacionRiesgoService);
  historial: HistorialEvaluacion[] = [];

  displayedColumns = [
    'fecha',
    'imc',
    'puntaje',
    'riesgo'
  ];

  ngOnInit(): void {
    const usuario = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    if (usuario.rol === 'Administrador') {

      this.evaluacionService
        .obtenerHistoriales()
        .subscribe({
          next: (resp) => {
            this.historial = resp.data;
          }
        });

    } else {

      this.evaluacionService
        .obtenerHistorial(usuario.id)
        .subscribe({
          next: (resp) => {
            this.historial = resp.data;
          }
        });
    }
  }

  exportarExcel(): void {

    const data = this.historial.map(item => ({
      Fecha: item.fecha_evaluacion,
      IMC: item.imc,
      Puntaje: item.puntaje,
      Riesgo: item.resultado_riesgo
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Historial');
    XLSX.writeFile( workbook,'historial-evaluaciones.xlsx');
  }
}
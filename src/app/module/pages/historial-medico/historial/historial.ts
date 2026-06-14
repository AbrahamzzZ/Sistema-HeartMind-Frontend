import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { EvaluacionRiesgoService } from '../../../../core/service/evaluacionRiesgo.service';
import { HistorialEvaluacion } from '../../../../core/interface/evaluacion/historialEvaluacion';

@Component({
  selector: 'app-historial',
  standalone: false,
  templateUrl: './historial.html',
  styleUrl: './historial.scss',
})
export class Historial implements OnInit, AfterViewInit {

  private readonly evaluacionService =
    inject(EvaluacionRiesgoService);

  displayedColumns = [
    'fecha',
    'imc',
    'puntaje',
    'riesgo'
  ];

  dataSource = new MatTableDataSource<HistorialEvaluacion>([]);
  totalRiesgoAlto = 0;
  totalRiesgoModerado = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {

    const usuario =
      JSON.parse(localStorage.getItem('user') || '{}');

    if (usuario.rol === 'Administrador') {

      this.evaluacionService
        .obtenerHistoriales()
        .subscribe({
          next: (resp) => {
            this.cargarDatos(resp.data);
          }
        });

    } else {

      this.evaluacionService
        .obtenerHistorial(usuario.id)
        .subscribe({
          next: (resp) => {
            this.cargarDatos(resp.data);
          }
        });
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private cargarDatos(
    data: HistorialEvaluacion[]
  ): void {

    this.dataSource.data = data;

    this.totalRiesgoAlto =
      data.filter(
        x => x.resultado_riesgo === 'Alto'
      ).length;

    this.totalRiesgoModerado =
      data.filter(
        x => x.resultado_riesgo === 'Moderado'
      ).length;
  }

  aplicarFiltro(event: Event): void {

    const filtro =
      (event.target as HTMLInputElement)
        .value
        .trim()
        .toLowerCase();

    this.dataSource.filter = filtro;
  }

  exportarExcel(): void {

    const data =
      this.dataSource.data.map(item => ({
        Fecha: item.fecha_evaluacion,
        IMC: item.imc,
        Puntaje: item.puntaje,
        Riesgo: item.resultado_riesgo
      }));

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Historial'
    );

    XLSX.writeFile(
      workbook,
      'historial-evaluaciones.xlsx'
    );
  }
}
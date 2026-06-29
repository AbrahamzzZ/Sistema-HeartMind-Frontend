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
  private readonly evaluacionService = inject(EvaluacionRiesgoService);

  displayedColumns = [
    'fechaEvaluacion',
    'imc',
    'porcentajeRiesgo',
    'resultadoRiesgo'
  ];

  dataSource = new MatTableDataSource<HistorialEvaluacion>([]);
  totalRiesgoAlto = 0;
  totalRiesgoModerado = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');

    if (usuario.rol === 'Administrador') {
      this.evaluacionService.obtenerHistoriales().subscribe({
        next: (resp) => {
          if (resp.success) {
            this.cargarDatos(resp.data);
          }
        },
        error: (err) => console.error('Error al obtener historiales', err)
      });
    } else {
      this.evaluacionService.obtenerHistorial(usuario.id).subscribe({
        next: (resp) => {
          if (resp.success) {
            this.cargarDatos(resp.data);
          }
        },
        error: (err) => console.error('Error al obtener historial', err)
      });
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarDatos(data: any[]): void {
    const historial: HistorialEvaluacion[] = data.map(item => ({
      id: item.id,
      usuarioId: item.usuario_id,
      edad: item.edad,
      genero: item.genero,
      altura: Number(item.altura),
      peso: Number(item.peso),
      imc: Number(item.imc),
      presionSistolica: item.presion_sistolica,
      presionDiastolica: item.presion_diastolica,
      nivelColesterol: item.nivel_colesterol,
      glucosa: item.glucosa,
      fumador: Boolean(item.fumador),
      alcohol: Boolean(item.alcohol),
      actividadFisica: Boolean(item.actividad_fisica),
      porcentajeRiesgo: Number(item.porcentaje_riesgo),
      resultadoRiesgo: item.resultado_riesgo,
      recomendaciones: JSON.parse(item.recomendaciones),
      fechaEvaluacion: item.fecha_evaluacion
    }));

    this.dataSource.data = historial;
    this.totalRiesgoAlto = historial.filter(x => x.resultadoRiesgo === 'Alto').length;
    this.totalRiesgoModerado = historial.filter(x => x.resultadoRiesgo === 'Moderado').length;
  }

  aplicarFiltro(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filtro;
  }

  exportarExcel(): void {
    const data = this.dataSource.data.map(item => ({
      'Fecha': new Date(item.fechaEvaluacion).toLocaleString(),
      'Edad': item.edad,
      'Género': item.genero === 1 ? 'Mujer' : 'Hombre',
      'Altura (cm)': item.altura,
      'Peso (kg)': item.peso,
      'IMC': item.imc,
      'Presión Sistólica': item.presionSistolica,
      'Presión Diastólica': item.presionDiastolica,
      'Colesterol': item.nivelColesterol,
      'Glucosa': item.glucosa,
      'Fumador': item.fumador ? 'Sí' : 'No',
      'Alcohol': item.alcohol ? 'Sí' : 'No',
      'Actividad Física': item.actividadFisica ? 'Sí' : 'No',
      'Riesgo (%)': item.porcentajeRiesgo,
      'Clasificación': item.resultadoRiesgo,
      'Recomendaciones': item.recomendaciones.join(', ')
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Historial');
    XLSX.writeFile(workbook, 'historial-evaluaciones.xlsx');
  }
}
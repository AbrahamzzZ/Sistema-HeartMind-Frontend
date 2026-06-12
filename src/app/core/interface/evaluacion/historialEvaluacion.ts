export interface HistorialEvaluacion {
  id: number;
  usuarioId: number;
  imc: number;
  puntaje: number;
  resultadoRiesgo: string;
  fechaEvaluacion?: string;
}
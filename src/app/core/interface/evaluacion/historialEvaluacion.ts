export interface HistorialEvaluacion {
  id: number;
  usuarioId: number;
  imc: number;
  puntaje: number;
  resultado_riesgo?: string;
  fecha_evaluacion?: string;
}
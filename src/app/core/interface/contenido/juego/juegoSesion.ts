export interface JuegoSesion {
  id: number;
  usuario_id: number;
  juego_id: number;
  puntaje: number;
  tiempo_segundos: number;
  completado: boolean;
  fecha_inicio: string;
  fecha_fin?: string;
}
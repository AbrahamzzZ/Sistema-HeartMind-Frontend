export interface JuegoResultadoDetalle {
  id: number;
  sesion_id: number;
  juego_id: number;
  item_id?: number;
  respuesta_usuario?: string;
  es_correcto?: boolean;
}
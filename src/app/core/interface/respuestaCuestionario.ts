export interface RespuestaCuestionario {
  preguntaId: number;
  opcionId: number;
  correcta: boolean;
  mensaje: string;
}
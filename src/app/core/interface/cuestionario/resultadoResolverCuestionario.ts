import { RespuestaCuestionario } from "./respuestaCuestionario";

export interface ResultadoResolverCuestionario {
  puntaje: number;
  respuestas: RespuestaCuestionario[];
}
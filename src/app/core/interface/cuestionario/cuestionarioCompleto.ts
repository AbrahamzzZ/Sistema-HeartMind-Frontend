import { PreguntaCuestionario } from "./preguntaCuestionario";

export interface CuestionarioCompleto {
  titulo: string;
  descripcion: string;
  preguntas: PreguntaCuestionario[];
}
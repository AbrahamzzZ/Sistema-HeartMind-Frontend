import { PreguntaCuestionario } from "./preguntaCuestionario";

export interface CuestionarioCompleto {
  id?: number;
  titulo: string;
  descripcion: string;
  preguntas: PreguntaCuestionario[];
}
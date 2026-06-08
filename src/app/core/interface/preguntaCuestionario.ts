import { OpcionRespuesta } from "./opcionRespuesta";

export interface PreguntaCuestionario{
    id: number;
    cuestionarioId: number;
    pregunta: string;
    opciones: OpcionRespuesta[];
}
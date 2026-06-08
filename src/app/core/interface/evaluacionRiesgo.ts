export interface EvaluacionRiesgo{
    id: number;
    usuarioId: number;
    edad: number;
    peso: number;
    altura: number;
    imc: number;
    presionSistolica: number;
    presionDiastolica: number;
    nivelColesterol: number;
    fumador: boolean;
    diabetico: boolean;
    actividadFisica: boolean;
    antecedentesFamiliares: boolean;
    puntaje: number;
    resultadoRiesgo: string;
}
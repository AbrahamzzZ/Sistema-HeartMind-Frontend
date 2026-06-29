export interface HistorialEvaluacion {
    id?: number;
    usuarioId?: number;
    edad?: number;
    genero?: number;
    altura?: number;
    peso?: number;
    imc: number;
    presionSistolica?: number;
    presionDiastolica?: number;
    nivelColesterol?: number;
    glucosa?: number;
    fumador?: boolean;
    alcohol?: boolean;
    actividadFisica?: boolean;
    probabilidadRiesgo?: number;   
    porcentajeRiesgo: number;  
    resultadoRiesgo: string;
    recomendaciones: string[];
    fechaEvaluacion: string;
}
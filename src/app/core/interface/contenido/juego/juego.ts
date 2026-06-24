export interface Juego {
  id: number;
  nombre: string;
  codigo?: string;
  descripcion: string;
  tipo: string;
  activo?: boolean;
  fecha_creacion?: string;
}
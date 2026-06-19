export interface MemoriaCarta {
  id: number;
  juego_id: number;
  contenido: string;
  tipo: 'texto' | 'imagen';
  par_id: number;
}
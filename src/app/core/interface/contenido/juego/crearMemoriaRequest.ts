export interface CrearMemoriaRequest {
  juego_id: number;
  cartas: {
    contenido: string;
    tipo: 'texto';
    parId: number;
  }[];
}
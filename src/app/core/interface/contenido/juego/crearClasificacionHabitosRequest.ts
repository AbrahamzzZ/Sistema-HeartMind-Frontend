export interface CrearClasificaHabitosRequest {
  juego_id: number;
  categorias: {
    nombre: string;
    orden: number;
  }[];
  items: {
    texto: string;
    categoriaCorrectaId: number;
    orden: number;
  }[];
}
import { JuegoCategoria } from "./juegoCategoria";
import { JuegoItem } from "./juegoItem";

export interface CrearClasificaHabitosRequest {
  juego_id: number;
  categorias: JuegoCategoria[];
  items: JuegoItem[];
}
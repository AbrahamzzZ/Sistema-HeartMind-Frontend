import { JuegoCategoria } from "./juegoCategoria";
import { JuegoItem } from "./juegoItem";

export interface DatosClasificaHabitos {
  categorias: JuegoCategoria[];
  items: JuegoItem[];
}
export interface Item {
  id: number;
  cantidad: number;
  precio: number;
  nombreInsumo: string;
}

export interface Historia {
  fecha: string;
  evento: string;
}
export interface Requerimiento {
  id: number;
  fecha: string;
  usuario: string;
  area: string;
  nota: string;
  estado: string;
  historia: Historia[];
  items: Item[];
}



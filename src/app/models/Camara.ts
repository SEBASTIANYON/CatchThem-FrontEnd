import { Entidad } from './Entidad';

export class Camara {
  id_camara: number = 0;
  ubicacion: string = '';
  tipo_camara: string = '';
  area_vigilada: string = '';
  estado: string = '';
  entidad: Entidad = new Entidad();
}

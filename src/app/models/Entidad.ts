import { TipoEntidad } from './TipoEntidad';

export class Entidad {
  idEntidad: number = 0;
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  tipoEntidad: TipoEntidad = new TipoEntidad();

  get tipoEntidadTexto(): string {
  return this.tipoEntidad ? this.tipoEntidad.sector : '';
}
}

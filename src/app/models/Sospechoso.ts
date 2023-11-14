import { Entidad } from "./Entidad";
export class Sospechoso {
  idSospechoso: number = 0;
  nombre: string = '';
  alias: string = '';
  nacimiento: Date = new Date(Date.now());
  genero: string = '';
  nacionalidad: string = '';
  descripcion: string = '';
  historial: string = '';
  estado: string = '';
  fecharegistro: Date = new Date(Date.now());
  imagen:string='';
  entidad:Entidad=new Entidad()
}

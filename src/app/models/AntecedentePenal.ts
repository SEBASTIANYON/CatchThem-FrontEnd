import { Sospechoso } from './Sospechoso';

export class AntecedentePenal {
  id_antecedente: number = 0;
  delito: string = '';
  fecha_comision: Date = new Date(Date.now());
  fecha_condena: Date = new Date(Date.now());
  sentencia: string = '';
  ubicacion: string = '';
  estado: string = '';
  sospechoso: Sospechoso = new Sospechoso();
}

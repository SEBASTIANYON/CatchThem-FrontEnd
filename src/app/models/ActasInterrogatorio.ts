import { Sospechoso } from './Sospechoso';
import { Users } from './Users';
export class ActasInterrogatorio {
  id_acta: number = 0;
  detalles: string = '';
  fecha: Date = new Date(Date.now());
  sospechoso: Sospechoso = new Sospechoso();
  usuario: Users = new Users()
}

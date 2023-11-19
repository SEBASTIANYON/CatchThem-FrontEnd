import { Role } from './Role';
import { Entidad } from './Entidad';

export class Users {
  id: number = 0;
  username: string = '';
  password: string = '';
  enabled: boolean = false;
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  imagen: string = '';
  entidad: Entidad = new Entidad();
  roles: Role[] = new Array<Role>();
}
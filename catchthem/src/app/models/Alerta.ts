export class Alerta {
  id_alerta: number = 0;
  fecha: Date = new Date(Date.now());
  tipo: string = '';
  descripcion: string = '';
  ubicacion: string = '';
  gravedad: string = '';
}

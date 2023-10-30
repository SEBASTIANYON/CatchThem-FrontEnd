import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TipoEntidad } from '../models/TipoEntidad';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class TipoEntidadService {
  private url = `${base_url}/tipo-entidad`;
  private listaCambio = new Subject<TipoEntidad[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<TipoEntidad[]>(this.url);
  }

  insert(te: TipoEntidad) {
    return this.http.post(this.url, te);
  }

  setList(listaNueva: TipoEntidad[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<TipoEntidad>(`${this.url}/${id}`);
  }

  update(te: TipoEntidad) {
    return this.http.put(this.url, te);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Entidad } from '../models/Entidad';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class EntidadService {
  private url = `${base_url}/entidades`;
  private listaCambio = new Subject<Entidad[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Entidad[]>(this.url);
  }

  insert(us: Entidad) {
    return this.http.post(this.url, us);
  }

  setList(listaNueva: Entidad[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Entidad>(`${this.url}/${id}`);
  }

  update(u: Entidad) {
    return this.http.put(this.url, u);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

import { Alerta } from './../models/Alerta';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private url = `${base_url}/alertas`;
  private listaCambio = new Subject<Alerta[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Alerta[]>(this.url);
  }

  insert(ale: Alerta) {
    return this.http.post(this.url, ale);
  }

  setList(listaNueva: Alerta[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Alerta>(`${this.url}/${id}`);
  }

  update(ale: Alerta) {
    return this.http.put(this.url, ale);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

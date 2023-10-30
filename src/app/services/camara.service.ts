import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Camara } from '../models/Camara';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class CamaraService {
  private url = `${base_url}/camara`;
  private listaCambio = new Subject<Camara[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Camara[]>(this.url);
  }

  insert(cam: Camara) {
    return this.http.post(this.url, cam);
  }

  setList(listaNueva: Camara[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Camara>(`${this.url}/${id}`);
  }

  update(cam: Camara) {
    return this.http.put(this.url, cam);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

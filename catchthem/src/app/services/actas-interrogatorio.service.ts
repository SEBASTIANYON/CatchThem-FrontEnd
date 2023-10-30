import { ActasInterrogatorio } from './../models/ActasInterrogatorio';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ActasInterrogatorioService {
  private url = `${base_url}/actas-interrogatorio`;
  private listaCambio = new Subject<ActasInterrogatorio[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<ActasInterrogatorio[]>(this.url);
  }

  insert(act: ActasInterrogatorio) {
    return this.http.post(this.url, act);
  }

  setList(listaNueva: ActasInterrogatorio[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<ActasInterrogatorio>(`${this.url}/${id}`);
  }

  update(act: ActasInterrogatorio) {
    return this.http.put(this.url, act);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

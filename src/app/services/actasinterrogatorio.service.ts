import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { ActasInterrogatorio } from '../models/ActasInterrogatorio';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ActasinterrogatorioService {
  private url = `${base_url}/actas`;
  private listaCambio = new Subject<ActasInterrogatorio[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<ActasInterrogatorio[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(act: ActasInterrogatorio) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, act, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: ActasInterrogatorio[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<ActasInterrogatorio>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(act: ActasInterrogatorio) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, act, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}

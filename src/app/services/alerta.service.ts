import { Alerta } from './../models/Alerta';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private url = `${base_url}/alertas`;
  private listaCambio = new Subject<Alerta[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Alerta[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(ale: Alerta) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, ale, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Alerta[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Alerta>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(ale: Alerta) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, ale, {
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

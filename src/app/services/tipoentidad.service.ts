import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TipoEntidad } from '../models/TipoEntidad';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class TipoEntidadService {
  private url = `${base_url}/tipoentidad`;
  private listaCambio = new Subject<TipoEntidad[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<TipoEntidad[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(te: TipoEntidad) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, te, {
    headers: new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: TipoEntidad[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<TipoEntidad>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(te: TipoEntidad) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, te, {
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
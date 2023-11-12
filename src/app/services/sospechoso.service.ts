import { Injectable } from '@angular/core';
import { Sospechoso } from '../models/Sospechoso';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class SospechosoService {
  private url = `${base_url}/sospechoso`;
  private listaCambio = new Subject<Sospechoso[]>();
  constructor(private http: HttpClient) {}
  list() {

    let token = sessionStorage.getItem('token');

    return this.http.get<Sospechoso[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(sos: Sospechoso) {
    return this.http.post(this.url, sos);
  }

  setList(listaNueva: Sospechoso[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Sospechoso>(`${this.url}/${id}`);
  }

  update(u: Sospechoso) {
    return this.http.put(this.url, u);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

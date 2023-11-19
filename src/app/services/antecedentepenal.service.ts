import { AntecedentePenal } from './../models/AntecedentePenal';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class AntecedentePenalService {
  private url = `${base_url}/antecedentes`;
  private listaCambio = new Subject<AntecedentePenal[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<AntecedentePenal[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(ant: AntecedentePenal) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, ant, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: AntecedentePenal[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<AntecedentePenal>(`${this.url}/${id}`);
  }

  /*
  update(ant: AntecedentePenal) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, ant);
  }
  */
 
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application'),
    });
  }
}

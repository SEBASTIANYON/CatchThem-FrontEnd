import { AntecedentePenal } from './../models/AntecedentePenal';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<AntecedentePenal[]>(this.url);
  }

  insert(ant: AntecedentePenal) {
    return this.http.post(this.url, ant);
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

  update(ant: AntecedentePenal) {
    return this.http.put(this.url, ant);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

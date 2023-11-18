import { AntecedentePenal } from './../models/AntecedentePenal';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { AntecedentesPorDelitoDTO } from '../models/AntecentesPorDeltitoDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class AntecedentePenalService {
  private url = `${base_url}/antecedente-penal`;
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
    let token = sessionStorage.getItem('token');
    return this.http.get<AntecedentePenal>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(ant: AntecedentePenal) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, ant, {
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

  getCount(): Observable<AntecedentesPorDelitoDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<AntecedentesPorDelitoDTO[]>(
      `${this.url}/DelitoPorAntecedente`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }
}

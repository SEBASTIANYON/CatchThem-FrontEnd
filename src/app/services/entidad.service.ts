import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SospechosoEntidadDTO } from '../models/SospechosoEntidadDTO';

import { Observable, Subject } from 'rxjs';
import { Entidad } from '../models/Entidad';
import { EntidadCamarasDTO } from '../models/EntidadCamarasDTO';
import { cantidadsospechososDTO } from '../models/cantidadsospechososDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class EntidadService {
  private url = `${base_url}/entidad`;
  private listaCambio = new Subject<Entidad[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Entidad[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(us: Entidad) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, us, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Entidad[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Entidad>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(u: Entidad) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, u, {
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

  //Funcion que me permite mostrar informacion sobre la edad promedio de sospechosos en una entidad
  getEdadPromedio(): Observable<SospechosoEntidadDTO[]> {
    let token = sessionStorage.getItem('token');

    return this.http.get<SospechosoEntidadDTO[]>(`${this.url}/edadpromedio`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'), 
    });

  getCantidadDeCamaras(): Observable<EntidadCamarasDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<EntidadCamarasDTO[]>(`${this.url}/cantidadcamaras`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    })
  }



  cantidadSospechosos():Observable<cantidadsospechososDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<cantidadsospechososDTO[]>(`${this.url}/cantidadsospechosos`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    })
  }
}

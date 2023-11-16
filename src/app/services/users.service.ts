import { Injectable } from '@angular/core';
import { Users } from '../models/Users';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = `${base_url}/users`;
  private listaCambio = new Subject<Users[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Users[]>(this.url);
  }

  insert(us: Users) {
    return this.http.post(this.url, us);
  }

  setList(listaNueva: Users[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Users>(`${this.url}/${id}`);
  }

  insertarRol(authority: string, id: number) {
    const body = { authority, id: id }; 

    return this.http.post<any>(`${this.url}/insertarrol`, body);
  }

  update(u: Users) {
    return this.http.put(this.url, u);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

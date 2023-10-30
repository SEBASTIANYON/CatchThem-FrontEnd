import { Role } from './../models/Role';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url = `${base_url}/role`;
  private listaCambio = new Subject<Role[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Role[]>(this.url);
  }

  insert(rol: Role) {
    return this.http.post(this.url, rol);
  }

  setList(listaNueva: Role[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Role>(`${this.url}/${id}`);
  }

  update(rol: Role){
    return this.http.put(this.url,rol);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}

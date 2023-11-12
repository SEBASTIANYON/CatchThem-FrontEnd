import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private url = `${base_url}/authenticate`;

  login(request: JwtRequest) {
    return this.http.post(this.url, request);
  }

  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole(){
    let token = sessionStorage.getItem('token')
    if(!token){
      return null;
    }

    const helper= new JwtHelperService();
    const decodedToken=helper.decodeToken(token)
    return decodedToken?.role;
  }

  showUsername(){
    let token = sessionStorage.getItem("token");
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.nombre;
  }

  showEntidad(){
    let token = sessionStorage.getItem("token");
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.entidad;
  }

  showId(){
    let token = sessionStorage.getItem("token");
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.id;
  }

}

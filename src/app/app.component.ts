import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'catchthem';
  role: string = '';
  username: string = ''
  entidad: string = ''
  constructor(private loginService: LoginService) {}

  cerrar() {
    sessionStorage.clear();
  }
  verificar() {
    this.role = this.loginService.showRole();
    this.username = this.loginService.showUsername();
    this.entidad = this.loginService.showEntidad();
    return this.loginService.verificar();
  }
  validarRol() {
    if (this.role == 'ADMIN' || this.role == 'POLICIA' || this.role == 'AGENTE') {
      return true;
    } else {
      return false;
    }
  }
}

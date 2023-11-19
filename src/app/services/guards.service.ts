import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private lService: LoginService, private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const rpta = this.lService.verificar();

    if (rpta) {
      const rol = this.lService.showRole()

      if (route.routeConfig?.data?.['role'] === undefined || route.routeConfig?.data?.['role']?.indexOf(rol) > -1) {
        return true
      }

      return false
    }

    this.router.navigate(['/login']);
    return false;

  }

}

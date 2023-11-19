import { Component, OnInit } from '@angular/core';
import { ActasInterrogatorio } from 'src/app/models/ActasInterrogatorio';
import { Alerta } from 'src/app/models/Alerta';
import { Role } from 'src/app/models/Role';
import { Users } from 'src/app/models/Users';
import { ActasinterrogatorioService } from 'src/app/services/actasinterrogatorio.service';
import { AlertaService } from 'src/app/services/alerta.service';
import { LoginService } from 'src/app/services/login.service';
import { RoleService } from 'src/app/services/role.service';
import { UsersService } from 'src/app/services/users.service';
import { DialogoConfirmacionComponent } from '../../dialog/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  public users: Users[] = [];
  public roles: Role[] = [];
  public actas: ActasInterrogatorio[] = [];
  public alertas: Alerta[] = [];
  public rolesusuariros: Role[] = [];
  role: string = '';
  username: string = ''
  entidad: string = ''

  constructor(private uS: UsersService, private rS: RoleService,private loginService: LoginService, private aS:ActasinterrogatorioService, private alS:AlertaService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data: Users[]) => {
      this.users = data;
    });
    this.uS.getList().subscribe((data: Users[]) => {
      this.users = data;
    });
    this.rS.list().subscribe((data: Role[]) => {
      this.roles = data;
    });
    this.aS.list().subscribe((data: ActasInterrogatorio[]) => {
      this.actas = data;
    });
    this.alS.list().subscribe((data: Alerta[]) => {
      this.alertas = data;
    });
  }

  getUniqueRoles(userId: number): Role[] {
    const uniqueRoles: Role[] = [];
    this.roles.forEach((role) => {
      if (role.user.id === userId && !uniqueRoles.some((r) => r.rol === role.rol)) {
        uniqueRoles.push(role);
      }
    });
    return uniqueRoles;
  }

  getUniqueActas(userId: number): ActasInterrogatorio[] {
    const uniqueActas: ActasInterrogatorio[] = [];
    this.actas.forEach((acta) => {
      if (acta.usuario.id === userId && !uniqueActas.some((a) => a.id_acta === acta.id_acta)) {
        uniqueActas.push(acta);
      }
    });
    return uniqueActas;
  }

  getUniqueAlertas(userId: number): Alerta[] {
    const uniqueAlertas: Alerta[] = [];
    this.alertas.forEach((alerta) => {
      if (alerta.usuario.id === userId && !uniqueAlertas.some((a) => a.id_alerta === alerta.id_alerta)) {
        uniqueAlertas.push(alerta);
      }
    });
    return uniqueAlertas;
  }
  
  hasAdminRole(roles: Role[]): boolean {
    return roles.some(role => role.rol === 'ADMIN');
  }
  

  verificar() {
    this.role = this.loginService.showRole();
    this.username = this.loginService.showUsername();
    this.entidad = this.loginService.showEntidad();
    return this.loginService.verificar();
  }
  eliminar(id: number) {
    const uniqueRoles = this.getUniqueRoles(id);
  
    const eliminarRolesRecursivo = (roles: any[], index: number) => {
      if (index < roles.length) {
        const role = roles[index];
        this.rS.delete(role.id).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
            eliminarRolesRecursivo(roles, index + 1);
          });
        });
      } else {
        this.eliminarActasAlertasUsuario(id);
      }
    };
  
    if (uniqueRoles.length > 0) {
      eliminarRolesRecursivo(uniqueRoles, 0);
    } else {
      this.eliminarActasAlertasUsuario(id);
    }
  }
  
  eliminarActasAlertasUsuario(id: number) {
    const uniqueActas = this.getUniqueActas(id);
    const uniqueAlertas = this.getUniqueAlertas(id);
  
    const eliminarActasRecursivo = (actas: ActasInterrogatorio[], index: number) => {
      if (index < actas.length) {
        const acta = actas[index];
        this.aS.delete(acta.id_acta).subscribe(() => {
          eliminarActasRecursivo(actas, index + 1);
        });
      } else {
        // Después de eliminar todas las actas, eliminar alertas
        eliminarAlertasRecursivo(uniqueAlertas, 0);
      }
    };
  
    const eliminarAlertasRecursivo = (alertas: Alerta[], index: number) => {
      if (index < alertas.length) {
        const alerta = alertas[index];
        this.alS.delete(alerta.id_alerta).subscribe(() => {
          eliminarAlertasRecursivo(alertas, index + 1);
        });
      } else {
        // Finalmente, eliminar usuario
        this.eliminarUsuario(id);
      }
    };
  
    // Iniciar el proceso llamando a eliminarActasRecursivo
    eliminarActasRecursivo(uniqueActas, 0);
  }
  
  openDialog(id: number){
    this.dialog.open(DialogoConfirmacionComponent)
    .afterClosed()
    .subscribe((confirmacion: Boolean) => {
      if(confirmacion){
        this.eliminar(id)
      }
    })
  }

  eliminarUsuario(id: number) {
    this.uS.delete(id).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
  

  filter(en: any) {
    this.users.filter = en.target.value.trim();
  }
}


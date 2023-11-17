import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/Role';
import { Users } from 'src/app/models/Users';
import { RoleService } from 'src/app/services/role.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  public users: Users[] = [];
  public roles: Role[] = [];

  constructor(private uS: UsersService, private rS: RoleService) {}

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
  }

  // Método para obtener roles únicos para un usuario específico
  getUniqueRoles(userId: number): Role[] {
    const uniqueRoles: Role[] = [];
    this.roles.forEach((role) => {
      if (role.user.id === userId && !uniqueRoles.some((r) => r.rol === role.rol)) {
        uniqueRoles.push(role);
      }
    });
    return uniqueRoles;
  }

  eliminar(id: number) {
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

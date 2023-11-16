import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/Users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  public users: Users[] = [];

  constructor(private uS: UsersService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data: Users[]) => {
      this.users = data;
    });
    this.uS.getList().subscribe((data: Users[]) => {
      this.users = data;
    });
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.users.filter = en.target.value.trim();
  }
}

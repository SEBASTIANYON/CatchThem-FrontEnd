import { Component , OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/Role';
import { Users } from 'src/app/models/Users';
import { RoleService } from 'src/app/services/role.service';
import { UsersService } from 'src/app/services/users.service';
import { DialogoConfirmacionComponent } from '../../dialog/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-role',
  templateUrl: './crear-role.component.html',
  styleUrls: ['./crear-role.component.css']
})
export class CrearRoleComponent implements OnInit {
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  displayedColumns: string[] = [
    'id',
    'rol',
    'usuario',
    'eliminar'
  ];

  form: FormGroup = new FormGroup({});
  role: Role = new Role();
  mensaje: string = '';
  public roles: Role[] = [];
  lista_users: Users[]=[];
  tipos: { value: string; viewValue: string }[] = [
    { value: 'Policia', viewValue: 'Policia' },
    { value: 'Agente', viewValue: 'Agente' },
  ];

  constructor(
    private rS: RoleService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsersService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
      
    this.form = this.formBuilder.group({
      id: [''],
      user: ['', Validators.required],
      rol: ['', Validators.required],
    });

    this.uS.list().subscribe(data=>{
      this.uS.list().subscribe(data => {
        this.lista_users = data.filter(user => !this.hasAdminRole(user));
      });
    })

    this.rS.list().subscribe((data: Role[]) => {
      this.roles = data;
    });


    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  hasAdminRole(user: Users): boolean {
    return this.roles.some(role => role.user.id === user.id && role.rol === 'ADMIN');
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

  aceptar(): void {
  if (this.form.valid) {
    const userId = this.form.value.user;
    const rolValue = this.form.value.rol;

    // Verifica si el rol seleccionado es válido
    if (!this.isRoleValid(userId,rolValue)) {
      this.role.id = this.form.value.id;
      this.role.rol = rolValue;
      this.role.user.id = userId;

      this.rS.insert(this.role).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
        this.router.navigate(['role']);
      });
    } else {
      this.mensaje = 'El usuario ya posee este rol';
      this.snackBar.open(this.mensaje, "Aviso",{duration:2000});
    }
  } else {
    this.mensaje = 'Por favor complete todos los campos obligatorios.';
    this.snackBar.open(this.mensaje, "Aviso",{duration:2000});
  }
}

isRoleValid(userId: number, rolValue: string): boolean {
  return this.roles.some(role => role.user.id === userId && role.rol === rolValue);
}



  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });

    this.rS.getList().subscribe((data: Role[]) => {
      this.roles = data;
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}

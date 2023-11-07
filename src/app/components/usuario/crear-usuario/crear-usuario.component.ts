import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Entidad } from 'src/app/models/Entidad';
import { Users } from 'src/app/models/Users';
import { EntidadService } from 'src/app/services/entidad.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Users = new Users();
  mensaje: string = '';
  lista_entidades: Entidad[]=[];
  tipos: { value: string; viewValue: string }[] = [
    { value: 'Policia', viewValue: 'Policia' },
    { value: 'Agente de Seguridad', viewValue: 'Agente de Seguridad' },
  ];
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eS: EntidadService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    
    this.form = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      correo:["",Validators.required],
      telefono: ['', Validators.required],
      imagen: ['', Validators.required],
      entidad: ['', Validators.required],
    });

    this.eS.list().subscribe(data=>{
      this.lista_entidades=data;
    })
  }


  aceptar(): void {

    
    if (this.form.valid) {
      this.usuario.id = this.form.value.id;
      this.usuario.username = this.form.value.username;
      this.usuario.password = this.form.value.password;
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.correo = this.form.value.correo;
      this.usuario.telefono=this.form.value.telefono;
      this.usuario.imagen=this.form.value.imagen;
      this.usuario.entidad.idEntidad=this.form.value.entidad;
      this.uS.insert(this.usuario).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });

      this.router.navigate(['usuario']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          username: new FormControl(data.username),
          password: new FormControl(data.password),
          nombre: new FormControl(data.nombre),
          correo: new FormControl(data.correo),
          telefono: new FormControl(data.telefono),
          imagen: new FormControl(data.imagen),
          entidad: new FormControl(data.entidad.idEntidad),
        });
      });
    }
  }
}
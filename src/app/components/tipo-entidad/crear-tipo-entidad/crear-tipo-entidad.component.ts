import { TipoEntidad } from './../../../models/TipoEntidad';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {FormBuilder,FormGroup,Validators,AbstractControl,FormControl} from '@angular/forms';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { TipoEntidadService } from 'src/app/services/tipoentidad.service';

@Component({
  selector: 'app-crear-tipo-entidad',
  templateUrl: './crear-tipo-entidad.component.html',
  styleUrls: ['./crear-tipo-entidad.component.css'],
})

export class CrearTipoEntidadComponent implements OnInit{ 
  form: FormGroup = new FormGroup({});
  tipoEntidad: TipoEntidad = new TipoEntidad();
  mensaje: string = '';
  idTipo: number = 0;
  edicion: boolean = false;

  constructor(
    private iS: TipoEntidadService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idTipo = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      });
      this.form = this.formBuilder.group({
      idTipo: [''],
      sector: ['', Validators.required],
    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.tipoEntidad.idTipo = this.form.value.idTipo;
      this.tipoEntidad.sector = this.form.value.sector;
      

      if (this.edicion) { console.log(this.tipoEntidad)
        this.iS.update(this.tipoEntidad).subscribe(() => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      } else {
        this.iS.insert(this.tipoEntidad).subscribe((data) => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      } 
      this.router.navigate(['/tipoentidad']);
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
      this.iS.listId(this.idTipo).subscribe((data) => {
        this.form = new FormGroup({
          idTipo: new FormControl(data.idTipo),
          sector: new FormControl(data.sector),
        });
      });
    } 
  }
}

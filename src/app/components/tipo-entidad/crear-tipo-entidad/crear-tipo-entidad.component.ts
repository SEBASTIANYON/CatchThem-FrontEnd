import { TipoEntidad } from './../../../models/TipoEntidad';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { TipoEntidadService } from 'src/app/services/tipoentidad.service';

@Component({
  selector: 'app-crear-tipo-entidad',
  templateUrl: './crear-tipo-entidad.component.html',
  styleUrls: ['./crear-tipo-entidad.component.css'],
})
export class CrearTipoEntidadComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tipoEntidad: TipoEntidad = new TipoEntidad();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Pública', viewValue: 'Pública' },
    { value: 'Privada', viewValue: 'Privada' },
  ];

  constructor(
    private iS: TipoEntidadService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      sector: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.tipoEntidad.sector = this.form.value.sector;

      this.iS.insert(this.tipoEntidad).subscribe((data) => {
        this.iS.list().subscribe((data) => {
          this.iS.setList(data);
        });
      });
      if (this.edicion) {
        this.iS.update(this.tipoEntidad).subscribe(() => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      }
      this.router.navigate(['tipo']);
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}

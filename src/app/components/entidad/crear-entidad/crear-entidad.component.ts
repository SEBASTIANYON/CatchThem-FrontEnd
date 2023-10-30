import { TipoEntidad } from './../../../models/TipoEntidad';
import { Entidad } from './../../../models/Entidad';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { EntidadService } from 'src/app/services/entidad.service';

@Component({
  selector: 'app-crear-entidad',
  templateUrl: './crear-entidad.component.html',
  styleUrls: ['./crear-entidad.component.css'],
})
export class CrearEntidadComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  entidad: Entidad = new Entidad();
  mensaje: string = '';

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Pública', viewValue: 'Pública' },
    { value: 'Privada', viewValue: 'Privada' },
  ];

  constructor(
    private eS: EntidadService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idEntidad: [''],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      tipoEntidad:["",Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.entidad.idEntidad = this.form.value.idEntidad;
      this.entidad.nombre = this.form.value.nombre;
      this.entidad.direccion = this.form.value.direccion;
      this.entidad.telefono = this.form.value.telefono;
      this.entidad.tipoEntidad=this.form.value.tipoEntidad.tipoEntidad;

      this.eS.insert(this.entidad).subscribe((data) => {
        this.eS.list().subscribe((data) => {
          this.eS.setList(data);
        });
      });

      this.router.navigate(['entidades']);
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

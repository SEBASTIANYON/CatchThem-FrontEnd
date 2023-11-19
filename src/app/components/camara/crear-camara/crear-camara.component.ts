import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Camara } from 'src/app/models/Camara';
import { Entidad } from 'src/app/models/Entidad';
import { CamaraService } from 'src/app/services/camara.service';
import { EntidadService } from 'src/app/services/entidad.service';

@Component({
  selector: 'app-crear-camara',
  templateUrl: './crear-camara.component.html',
  styleUrls: ['./crear-camara.component.css'],
})
export class CrearCamaraComponent {
  form: FormGroup = new FormGroup({});
  camara: Camara = new Camara();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaEntidades: Entidad[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'A', viewValue: 'Activado' },
    { value: 'D', viewValue: 'Desactivado' },
  ];

  constructor(
    private eS: CamaraService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cS: EntidadService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id_camara: [''],
      ubicacion: ['', Validators.required],
      tipo_camara: ['', Validators.required],
      area_vigilada: ['', Validators.required],
      estado: ['', Validators.required],
      entidad: ['', Validators.required],
    });

    this.cS.list().subscribe((data) => {
      this.listaEntidades = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.camara.id_camara = this.form.value.id_camara;
      this.camara.ubicacion = this.form.value.ubicacion;
      this.camara.tipo_camara = this.form.value.tipo_camara;
      this.camara.area_vigilada = this.form.value.area_vigilada;
      this.camara.estado = this.form.value.estado;
      this.camara.entidad.idEntidad = this.form.value.entidad;

      this.eS.insert(this.camara).subscribe((data) => {
        this.eS.list().subscribe((data) => {
          this.eS.setList(data);
        });
      });

      this.router.navigate(['camaras']);
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

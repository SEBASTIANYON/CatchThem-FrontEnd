import { Component } from '@angular/core';
import { SospechosoService } from './../../../services/sospechoso.service';
import { Sospechoso } from './../../../models/Sospechoso';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-sospechoso',
  templateUrl: './crear-sospechoso.component.html',
  styleUrls: ['./crear-sospechoso.component.css'],
})
export class CrearSospechosoComponent {
  form: FormGroup = new FormGroup({});
  sospechoso: Sospechoso = new Sospechoso();
  mensaje: string = '';

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
  ];

  constructor(
    private oS: SospechosoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idSospechoso: [''],
      nombre: ['', Validators.required],
      alias: ['', Validators.required],
      nacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      descripcion: ['', Validators.required],
      historial: ['', Validators.required],
      estado: ['', Validators.required],
      fecharegistro: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.sospechoso.idSospechoso = this.form.value.idSospechoso;
      this.sospechoso.nombre = this.form.value.nombre;
      this.sospechoso.alias = this.form.value.alias;
      this.sospechoso.nacimiento = this.form.value.nacimiento;
      this.sospechoso.genero = this.form.value.genero;
      this.sospechoso.nacionalidad = this.form.value.nacionalidad;
      this.sospechoso.descripcion = this.form.value.descripcion;
      this.sospechoso.historial = this.form.value.historial;
      this.sospechoso.estado = this.form.value.estado;
      this.sospechoso.fecharegistro = this.form.value.fecharegistro;

      this.oS.insert(this.sospechoso).subscribe((data) => {
        this.oS.list().subscribe((data) => {
          this.oS.setList(data);
        });
      });

      this.router.navigate(['sospechoso']);
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

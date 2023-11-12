import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Sospechoso } from 'src/app/models/Sospechoso';
import { SospechosoService } from 'src/app/services/sospechoso.service';


@Component({
  selector: 'app-crear-sospechoso',
  templateUrl: './crear-sospechoso.component.html',
  styleUrls: ['./crear-sospechoso.component.css']
})
export class CrearSospechosoComponent {


  form: FormGroup = new FormGroup({});
  sospechoso: Sospechoso = new Sospechoso();
  mensaje: string = '';

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Femenino', viewValue: 'Femenino' },
    { value: 'Masculino', viewValue: 'Masculino' }
  ];

  constructor(
    private sS: SospechosoService,
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
      genero:["",Validators.required],
      nacionalidad:["",Validators.required],
      descripcion:[""],
      estado:["",Validators.required],

    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.sospechoso.idSospechoso = this.form.value.idSospechoso;
      this.sospechoso.nombre = this.form.value.nombre;
      this.sospechoso.alias = this.form.value.alias;
      this.sospechoso.nacimiento = this.form.value.nacimiento;
      this.sospechoso.nacionalidad=this.form.value.nacionalidad;

      this.sS.insert(this.sospechoso).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });

      this.router.navigate(['sospechosos']);
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

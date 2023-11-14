import { Component } from '@angular/core';
import { SospechosoService } from './../../../services/sospechoso.service';
import { Sospechoso } from './../../../models/Sospechoso';
import { FormBuilder, FormGroup, Validators, AbstractControl,FormControl} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-crear-sospechoso',
  templateUrl: './crear-sospechoso.component.html',
  styleUrls: ['./crear-sospechoso.component.css'],
})
export class CrearSospechosoComponent {
  form: FormGroup = new FormGroup({});
  sospechoso: Sospechoso = new Sospechoso();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  tipos: { value: string; viewValue: string }[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
  ];

  tipos2: { value2: string; viewValue2: string }[] = [
    { value2: 'Capturado', viewValue2: 'Capturado' },
    { value2: 'Libre', viewValue2: 'Libre' },
  ];

  constructor(
    private oS: SospechosoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

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
      imagen:['', Validators.required]
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
      this.sospechoso.imagen = this.form.value.imagen;

      this.oS.insert(this.sospechoso).subscribe((data) => {
        this.oS.list().subscribe((data) => {
          this.oS.setList(data);
        });
      });

      this.router.navigate(['sospechosos']);
    }else {
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
      this.oS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idSospechoso: new FormControl(data.idSospechoso),
          nombre: new FormControl(data.nombre),
          alias: new FormControl(data.alias),
          nacimiento: new FormControl(data.nacimiento),
          genero: new FormControl(data.genero),
          nacionalidad: new FormControl(data.nacionalidad),
          descripcion: new FormControl(data.descripcion),
          historial: new FormControl(data.historial),
          estado: new FormControl(data.estado),
          fecharegistro: new FormControl(data.fecharegistro),
          imagen: new FormControl(data.imagen),
        });
      });
    }
  }
}
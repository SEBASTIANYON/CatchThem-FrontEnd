import { Entidad } from './../../../models/Entidad';
import { EntidadService } from './../../../services/entidad.service';
import { Component } from '@angular/core';
import { SospechosoService } from './../../../services/sospechoso.service';
import { Sospechoso } from './../../../models/Sospechoso';
import { FormBuilder, FormGroup, Validators, AbstractControl,FormControl} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-crear-sospechoso',
  templateUrl: './crear-sospechoso.component.html',
  styleUrls: ['./crear-sospechoso.component.css']
})
export class CrearSospechosoComponent {


  form: FormGroup = new FormGroup({});
  sospechoso: Sospechoso = new Sospechoso();
  mensaje: string = '';
  listaEntidad: Entidad[] = []
  id: number = 0;
  edicion: boolean = false;
  maxFecha: Date = new Date(Date.now());
  tipos: { value: string; viewValue: string }[] = [
    { value: 'Femenino', viewValue: 'Femenino' },
    { value: 'Masculino', viewValue: 'Masculino' }
  ];

  constructor(
    private sS: SospechosoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eS:EntidadService,
    private loginService: LoginService,
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
      imagen:['', Validators.required],
      entidad:['']
    });

    this.eS.list().subscribe(data => {
      this.listaEntidad = data
    })

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
      this.sospechoso.entidad.idEntidad= this.form.value.entidad;

      if(this.edicion){
        this.sospechoso.entidad.idEntidad = this.form.value.entidad
      }
      else {
        this.sospechoso.entidad.idEntidad = this.loginService.showId()
      }

      if (this.edicion) {
        console.log(this.sospechoso)
        this.oS.update(this.sospechoso).subscribe(() => {
          this.oS.list().subscribe((data) => {
            this.oS.setList(data);
          });
          console.log("actualizar")
        });
      } else {
        this.oS.insert(this.sospechoso).subscribe((data) => {
        this.oS.list().subscribe((data) => {
          this.oS.setList(data);
        });
      });
     }
      this.router.navigate(['/sospechosos']);
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
      this.oS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idSospechoso: new FormControl(data.idSospechoso),
          nombre: new FormControl(data.nombre, Validators.required),
          alias: new FormControl(data.alias, Validators.required),
          nacimiento: new FormControl(data.nacimiento, Validators.required),
          genero: new FormControl(data.genero, Validators.required),
          nacionalidad: new FormControl(data.nacionalidad, Validators.required),
          descripcion: new FormControl(data.descripcion, Validators.required),
          historial: new FormControl(data.historial, Validators.required),
          estado: new FormControl(data.estado, Validators.required),
          fecharegistro: new FormControl(data.fecharegistro, Validators.required),
          imagen: new FormControl(data.imagen, Validators.required),
          entidad: new FormControl(data.entidad.idEntidad),
        });
      });
    }
  }
}

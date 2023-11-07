import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Alerta } from 'src/app/models/Alerta';
import { AlertaService } from 'src/app/services/alerta.service';


@Component({
  selector: 'app-crear-alertas',
  templateUrl: './crear-alertas.component.html',
  styleUrls: ['./crear-alertas.component.css']
})
export class CrearAlertasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  alerta: Alerta = new Alerta();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  gravedad: { value: string; viewValue: string }[] = [
    { value: 'Emergencia', viewValue: 'Emergencia' },
    { value: 'Urgente', viewValue: 'Urgente' },
    { value: 'No Urgente', viewValue: 'No Urgente' },
  ];

  constructor(
    private aS: AlertaService,
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
      id: [''],
      fecha: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      gravedad: ['', Validators.required],
      ubicacion:["",Validators.required],
      usuario:[""]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.alerta.descripcion = this.form.value.descripcion;
      this.alerta.fecha = this.form.value.fecha;
      this.alerta.gravedad = this.form.value.gravedad;
      this.alerta.tipo = this.form.value.tipo;
      this.alerta.ubicacion=this.form.value.ubicacion;
      this.alerta.usuario.id=this.form.value.usuario;

      if (this.edicion) {
        this.aS.update(this.alerta).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      } else {
        this.aS.insert(this.alerta).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }

      this.router.navigate(['alertas']);
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
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id_alerta),
          fecha: new FormControl(data.fecha),
          tipo: new FormControl(data.tipo),
          descripcion:new FormControl(data.descripcion),
          gravedad:new FormControl(data.gravedad),
          ubicacion: new FormControl(data.ubicacion),
          usuario: new FormControl(data.usuario.nombre),
        });
      });
    }
  }

}

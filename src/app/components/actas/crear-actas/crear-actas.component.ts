import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ActasInterrogatorio } from 'src/app/models/ActasInterrogatorio';
import { Sospechoso } from 'src/app/models/Sospechoso';
import { ActasinterrogatorioService } from 'src/app/services/actasinterrogatorio.service';
import { LoginService } from 'src/app/services/login.service';
import { SospechosoService } from 'src/app/services/sospechoso.service';

@Component({
  selector: 'app-crear-actas',
  templateUrl: './crear-actas.component.html',
  styleUrls: ['./crear-actas.component.css']
})
export class CrearActasComponent {
  form: FormGroup = new FormGroup({});
  acta: ActasInterrogatorio = new ActasInterrogatorio();
  mensaje: string = '';
  listaSospechosos: Sospechoso[] = []
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private aS: ActasinterrogatorioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sS: SospechosoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      detalles: ['', Validators.required],
      fecha: ['', Validators.required],
      sospechoso:['', Validators.required],
      usuario:['']
    });

    this.sS.list().subscribe(data => {
      this.listaSospechosos = data
    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.acta.id_acta = this.form.value.id
      this.acta.detalles = this.form.value.detalles;
      this.acta.fecha = this.form.value.fecha;
      this.acta.sospechoso.idSospechoso = this.form.value.sospechoso;
      this.acta.usuario.id = this.loginService.showId()


      if (this.edicion) {
        console.log(this.acta)
        this.aS.update(this.acta).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
          console.log("actualizar")
        });
      } else {
        this.aS.insert(this.acta).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
          console.log("insertar")
        });
      }
      
      
      this.router.navigate(['/actas']);
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
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id_acta),
          fecha: new FormControl(data.fecha),
          detalles:new FormControl(data.detalles),
          sospechoso: new FormControl(data.sospechoso.idSospechoso),
          usuario: new FormControl(data.usuario.id),
        });
      });
    }
  }
}

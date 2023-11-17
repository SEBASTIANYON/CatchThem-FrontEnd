import { TipoEntidad } from './../../../models/TipoEntidad';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,FormControl
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
  sector: number=0;
  edicion: boolean = false;

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Publico', viewValue: 'Publico' },
    { value: 'Privado', viewValue: 'Privado' },
  ];

  constructor(
    private iS: TipoEntidadService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      sector: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.sector = data['sector'];
      this.edicion = data['sector'] != null;
      this.init();  
  });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.tipoEntidad.sector = this.form.value.sector;
      
      if (this.edicion) {
        this.iS.update(this.tipoEntidad).subscribe(() => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      }
      else{
        this.iS.insert(this.tipoEntidad).subscribe((data) => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      }
      this.router.navigate(['/tipo']);
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
      this.iS.listId(this.sector).subscribe((data) => {
        this.form = new FormGroup({
          sector: new FormControl(data.sector),
        });
      });
    }
  }
}

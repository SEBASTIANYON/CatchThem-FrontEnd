import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { concat } from 'rxjs';
import { Alerta } from 'src/app/models/Alerta';
import { AlertaService } from 'src/app/services/alerta.service';
import { LoginService } from 'src/app/services/login.service';


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
  geocoder: google.maps.Geocoder = new google.maps.Geocoder()

  gravedad: { value: string; viewValue: string }[] = [
    { value: 'Emergencia', viewValue: 'Emergencia' },
    { value: 'Urgente', viewValue: 'Urgente' },
    { value: 'No Urgente', viewValue: 'No Urgente' },
  ];
  tipos: { value: string; viewValue: string }[] = [
    { value: 'Informativa', viewValue: 'Informativa' },
    { value: 'Preventiva', viewValue: 'Preventiva' },
    { value: 'Acción', viewValue: 'Acción' },
  ];

  mapOptions: google.maps.MapOptions = {
    center: {
      lat: -12.1035139,
      lng: -76.9631051
    }
  }

  constructor(
    private aS: AlertaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      id: [''],
      fecha: [''],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      gravedad: ['', Validators.required],
      ubicacion: ['', Validators.required],
      usuario: ['']
    });


  }

  aceptar(): void {
    if (this.form.valid) {
      this.alerta.id_alerta = this.form.value.id
      this.alerta.descripcion = this.form.value.descripcion;
      if (this.edicion) {
        this.alerta.fecha = this.form.value.fecha
      }
      else {
        this.alerta.fecha = new Date(Date.now())
      }
      this.alerta.gravedad = this.form.value.gravedad;
      this.alerta.tipo = this.form.value.tipo;
      this.alerta.ubicacion = this.form.value.ubicacion;
      if (this.edicion) {
        this.alerta.usuario.id = this.form.value.usuario
      }
      else {
        this.alerta.usuario.id = this.loginService.showId()
      }

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
          tipo: new FormControl(data.tipo, Validators.required),
          descripcion: new FormControl(data.descripcion, Validators.required),
          gravedad: new FormControl(data.gravedad, Validators.required),
          ubicacion: new FormControl(data.ubicacion, Validators.required),
          usuario: new FormControl(data.usuario.id),

        });
        let coordinates = data.ubicacion.substring(1, data.ubicacion.length - 1).split(', ');
        let lat = Number(coordinates[0]);
        let lng = Number(coordinates[1]);
        this.mapOptions.center = {
          lat: lat,
          lng: lng
        };

      });
    }


  }

  onClick(e: any) {



    let lat = e.latLng.lat()
    let lng = e.latLng.lng()
    let latValue: number = lat
    let lngValue: number = lng
    let latLngString = '('.concat(latValue.toString(), ', ', lngValue.toString(), ')')



    this.form.patchValue({ ubicacion: latLngString })
  }


}

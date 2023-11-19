import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AntecedentePenal } from 'src/app/models/AntecedentePenal';
import { Sospechoso } from 'src/app/models/Sospechoso';
import { AntecedentePenalService } from 'src/app/services/antecedentepenal.service';
import { SospechosoService } from 'src/app/services/sospechoso.service';

@Component({
  selector: 'app-crear-antecedente',
  templateUrl: './crear-antecedente.component.html',
  styleUrls: ['./crear-antecedente.component.css'],
})
export class CrearAntecedenteComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  estados: { value: string; viewValue: string }[] = [
    { value: 'Activo', viewValue: 'Activo' },
    { value: 'Desactivo', viewValue: 'Desactivo' },
  ];

  delitos: { value: string; viewValue: string }[] = [
    { value: 'Robo', viewValue: 'Robo' },
    { value: 'Informatico', viewValue: 'Informatico' },
    { value: 'Estafa', viewValue: 'Estafa' },
    { value: 'Homicidio', viewValue: 'Homicidio' },
    { value: 'Asesinato', viewValue: 'Asesinato' },
  ];

  listasospechosos: Sospechoso[] = [];

  constructor(
    private aS: AntecedentePenalService,
    private formBuilder: FormBuilder,
    private sS: SospechosoService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  antecedente: AntecedentePenal = new AntecedentePenal();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id_antecedente: [''],
      delito: ['', Validators.required],
      fecha_comision: ['', Validators.required],
      fecha_condena: ['', Validators.required],
      sentencia: ['', Validators.required],
      ubicacion: ['', Validators.required],
      estado: ['', Validators.required],
      sospechoso: ['', Validators.required],
    });

    this.sS.list().subscribe((data) => {
      this.listasospechosos = data;
    });

  }

  aceptar() {
    if (this.form.valid) {
      this.antecedente.id_antecedente = this.form.value.id_antecedente;
      this.antecedente.delito = this.form.value.delito;
      this.antecedente.fecha_comision = this.form.value.fecha_comision;
      this.antecedente.fecha_condena = this.form.value.fecha_condena;
      this.antecedente.sentencia = this.form.value.sentencia;
      this.antecedente.ubicacion = this.form.value.ubicacion;
      this.antecedente.estado = this.form.value.estado;
      this.antecedente.sospechoso.idSospechoso = this.form.value.sospechoso;

      this.aS.insert(this.antecedente).subscribe((data) => {
        this.aS.list().subscribe((data) => {
          this.aS.setList(data);
        });
      });

      this.router.navigate(['/antecedentes']);
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


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
  selector: 'app-listar-antecedente',
  templateUrl: './listar-antecedente.component.html',
  styleUrls: ['./listar-antecedente.component.css']
})
export class ListarAntecedenteComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listasospechosos: Sospechoso[] = [];

  //Para el listar
  dataSource: MatTableDataSource<AntecedentePenal> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'delito',
    'fecha_comision',
    'fecha_condena',
    'sentencia',
    'sospechoso',
    'accion02',
  ];

  constructor(
    private aS: AntecedentePenalService,
    private formBuilder: FormBuilder,
    private sS: SospechosoService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  antecedente: AntecedentePenal = new AntecedentePenal();

  ngOnInit(): void {

    this.sS.list().subscribe((data) => {
      this.listasospechosos = data;
    });

    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
      });
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}

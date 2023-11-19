import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AntecedentePenal } from 'src/app/models/AntecedentePenal';
import { Sospechoso } from 'src/app/models/Sospechoso';
import { AntecedentePenalService } from 'src/app/services/antecedentepenal.service';
import { LoginService } from 'src/app/services/login.service';
import { SospechosoService } from 'src/app/services/sospechoso.service';
import { DialogoConfirmacionComponent } from '../../dialog/dialogo-confirmacion/dialogo-confirmacion.component';
@Component({
  selector: 'app-listar-antecedente',
  templateUrl: './listar-antecedente.component.html',
  styleUrls: ['./listar-antecedente.component.css'],
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
    private oS: SospechosoService,
    public route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    public dialog: MatDialog
  ) {}

  antecedente: AntecedentePenal = new AntecedentePenal();
  role: string = '';

  ngOnInit(): void {
    this.oS.list().subscribe((data) => {
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

    this.role = this.loginService.showRole();
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  openDialog(id_alerta: number){
    this.dialog.open(DialogoConfirmacionComponent)
    .afterClosed()
    .subscribe((confirmacion: Boolean) => {
      if(confirmacion){
        this.eliminar(id_alerta)
      }
    })
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


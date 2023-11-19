import { LoginService } from './../../../services/login.service';
import { TipoEntidad } from './../../../models/TipoEntidad';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TipoEntidadService } from 'src/app/services/tipoentidad.service';
import { DialogoConfirmacionComponent } from '../../dialog/dialogo-confirmacion/dialogo-confirmacion.component';
import {MatDialog} from '@angular/material/dialog';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-listar-tipo-entidad',
  templateUrl: './listar-tipo-entidad.component.html',
  styleUrls: ['./listar-tipo-entidad.component.css']
})
export class ListarTipoEntidadComponent implements OnInit {
  dataSource: MatTableDataSource<TipoEntidad> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  role: string = ''
  obs: Observable<any> | undefined
  displayedColumns: string[] = [
    'idTipo',
    'sector',
    'actualizar',
    'eliminar'
  ];

  constructor(private iS: TipoEntidadService, private loginService:LoginService,
    public dialog: MatDialog) {}
  ngOnInit(): void {
    this.iS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.obs=this.dataSource.connect()

    });
    this.iS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

  this.role = this.loginService.showRole()
  }

  openDialog(idTipo: number){
    this.dialog.open(DialogoConfirmacionComponent)
    .afterClosed()
    .subscribe((confirmacion: Boolean) => {
      if(confirmacion){
        this.eliminar(idTipo)
      }
    })
  }
  

  eliminar(id: number) {
    this.iS.delete(id).subscribe((data) => {
      this.iS.list().subscribe((data) => {
        this.iS.setList(data);
        this.obs=this.dataSource.connect()

      });
    });
  }

  filter(en:any){
    this.dataSource.filter=en.target.value.trim();
  }
}


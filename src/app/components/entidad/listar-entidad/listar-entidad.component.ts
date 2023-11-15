import { EntidadService } from 'src/app/services/entidad.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Entidad } from 'src/app/models/Entidad';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogoConfirmacionComponent } from '../../dialog/dialogo-confirmacion/dialogo-confirmacion.component';
import { LoginService } from 'src/app/services/login.service';
import {MatDialog} from '@angular/material/dialog';
import { TipoEntidad } from 'src/app/models/TipoEntidad';

@Component({
  selector: 'app-listar-entidad',
  templateUrl: './listar-entidad.component.html',
  styleUrls: ['./listar-entidad.component.css']
})
export class ListarEntidadComponent implements OnInit {
  dataSource: MatTableDataSource<Entidad> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'idEntidad',
    'nombre',
    'direccion',
    'telefono',
    'tipoEntidad',
    'actualizar',
    'eliminar'
  ];
  role: string = ''

  constructor(private uS: EntidadService,private loginService: LoginService,
    public dialog: MatDialog) {}
  
    ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.role = this.loginService.showRole()

    if(this.role !== 'AGENTE'){
      this.displayedColumns = [
        'idEntidad',
        'nombre',
        'direccion',
        'telefono',
        'tipoEntidad',
      ];
    }
  }

  //se agrega eliminar por id
  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }

  filter(en:any){
    this.dataSource.filterPredicate = (data: Entidad, filter: string) => {
      return data.nombre.toLocaleLowerCase().includes(filter) ||
      data.direccion.toLocaleLowerCase().includes(filter) ||
      data.telefono.toLocaleLowerCase().includes(filter) ||
      data.tipoEntidad.toLocaleString().includes(filter) ||
      data.idEntidad.toLocaleString().includes(filter) 
    }
    this.dataSource.filter=en.target.value.trim();
  }

  openDialog(idEntidad: number){
    this.dialog.open(DialogoConfirmacionComponent)
    .afterClosed()
    .subscribe((confirmacion: Boolean) => {
      if(confirmacion){
        this.eliminar(idEntidad)
      }
    })
  }
}

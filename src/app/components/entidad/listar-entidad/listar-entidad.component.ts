import { EntidadService } from 'src/app/services/entidad.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Entidad } from 'src/app/models/Entidad';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogoConfirmacionComponent } from '../../dialog/dialogo-confirmacion/dialogo-confirmacion.component';
import { LoginService } from 'src/app/services/login.service';
import {MatDialog} from '@angular/material/dialog';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-listar-entidad',
  templateUrl: './listar-entidad.component.html',
  styleUrls: ['./listar-entidad.component.css'],
})
export class ListarEntidadComponent implements OnInit {
  dataSource: MatTableDataSource<Entidad> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  role: string = ''
  obs: Observable<any> | undefined
  displayedColumns: string[] = [
    'idEntidad',
    'nombre',
    'direccion',
    'telefono',
    'tipoEntidad',
    'actualizar',
    'eliminar'
  ];

  constructor(private uS: EntidadService,private loginService: LoginService,
    public dialog: MatDialog) {}
  
    ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.obs=this.dataSource.connect()
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  //se agrega eliminar por id
  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);

        this.obs = this.dataSource.connect()
      });
    });
  } 
  
  filter(en:any){
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

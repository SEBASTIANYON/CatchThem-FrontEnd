import { ActasInterrogatorio } from './../../../models/ActasInterrogatorio';
import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';

import { ActasinterrogatorioService } from 'src/app/services/actasinterrogatorio.service';
import { LoginService } from 'src/app/services/login.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { DialogoConfirmacionComponent } from '../../dialog/dialogo-confirmacion/dialogo-confirmacion.component';


@Component({
  selector: 'app-listar-actas',
  templateUrl: './listar-actas.component.html',
  styleUrls: ['./listar-actas.component.css']
})
export class ListarActasComponent implements OnInit{
  dataSource: MatTableDataSource<ActasInterrogatorio> = new MatTableDataSource();
  @ViewChild(MatPaginator ,{static: true}) paginator!: MatPaginator;
  obs: Observable<any> | undefined
  role: string = ''



  constructor(
    private aS: ActasinterrogatorioService,
    private loginService: LoginService,
    public dialog: MatDialog
    ) {}


  ngOnInit(): void {


    console.log("carga ngoninit")
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.obs=this.dataSource.connect()
    });


    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.role = this.loginService.showRole()
  }


  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
        this.obs = this.dataSource.connect()
      });
    });
  }

  openDialog(id_acta: number){
    this.dialog.open(DialogoConfirmacionComponent)
    .afterClosed()
    .subscribe((confirmacion: Boolean) => {
      if(confirmacion){
        this.eliminar(id_acta)
      }
    })
  }

  reload(){
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect()
    });

    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }

  filter(en:any){
    //filtrar para objetos anidados
    this.dataSource.filterPredicate = (data: ActasInterrogatorio, filter: string) => {
      return data.sospechoso.nombre.toLocaleLowerCase().includes(filter) ||
      data.usuario.nombre.toLocaleLowerCase().includes(filter) ||
      data.id_acta.toLocaleString().includes(filter)

    }

    this.dataSource.filter=en.target.value.trim();
  }


}

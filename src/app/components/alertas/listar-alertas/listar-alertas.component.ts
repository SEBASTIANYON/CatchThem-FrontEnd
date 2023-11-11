import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alerta } from 'src/app/models/Alerta';
import { AlertaService } from 'src/app/services/alerta.service';
import { LoginService } from 'src/app/services/login.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { DialogoConfirmacionComponent } from '../../dialog/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoMapaComponent } from '../../dialog/dialogo-mapa/dialogo-mapa.component';

@Component({
  selector: 'app-listar-alertas',
  templateUrl: './listar-alertas.component.html',
  styleUrls: ['./listar-alertas.component.css']
})
export class ListarAlertasComponent implements OnInit {
  dataSource: MatTableDataSource<Alerta> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'usuario',
    'fecha',
    'tipo',
    'descripcion',
    'gravedad',
    'ubicacion',
    'actualizar',
    'eliminar'
  ];
  role: string = ''

  
  constructor(
    private aS: AlertaService,
    private loginService: LoginService,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.role = this.loginService.showRole()


    if(this.role !== 'ADMIN'){
      this.displayedColumns = [
        'usuario',
        'fecha',
        'tipo',
        'ubicacion',
        'gravedad',
        'descripcion',
      ];
    }
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

  openMap(alerta: Alerta){
    this.dialog.open(DialogoMapaComponent, {
      data: alerta.ubicacion
    })
  }

  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
      });
    });
  }

  filter(en:any){
    //filtrar para objetos anidados
    this.dataSource.filterPredicate = (data: Alerta, filter: string) => {
      return data.descripcion.toLocaleLowerCase().includes(filter) || 
      data.gravedad.toLocaleLowerCase().includes(filter) ||
      data.tipo.toLocaleLowerCase().includes(filter) ||
      data.ubicacion.toLocaleLowerCase().includes(filter) ||
      data.id_alerta.toLocaleString().includes(filter) ||
      data.fecha.toLocaleString().includes(filter) ||
      data.usuario.nombre.toLocaleLowerCase().includes(filter)
    }

    this.dataSource.filter=en.target.value.trim();
  }

}

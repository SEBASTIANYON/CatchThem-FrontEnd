import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './../../../services/login.service';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Camara } from 'src/app/models/Camara';
import { CamaraService } from 'src/app/services/camara.service';
import { DialogoConfirmacionComponent } from '../../dialog/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-listar-camara',
  templateUrl: './listar-camara.component.html',
  styleUrls: ['./listar-camara.component.css'],
})
export class ListarCamaraComponent {
  dataSource: MatTableDataSource<Camara> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id_camara',
    'ubicacion',
    'tipo_camara',
    'area_vigilada',
    'estado',
    'entidad',
    'accion02',
  ];
  constructor(private uS: CamaraService, private loginService: LoginService,
    public dialog: MatDialog) {}
  role: string = '';

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.role = this.loginService.showRole();
  }

  //se agrega eliminar por id
  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
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
}

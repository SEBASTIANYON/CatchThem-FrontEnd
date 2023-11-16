import { LoginService } from './../../../services/login.service';
import { SospechosoService } from './../../../services/sospechoso.service';
import { Sospechoso } from 'src/app/models/Sospechoso';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogoConfirmacionComponent } from '../../dialog/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-listar-sospechoso',
  templateUrl: './listar-sospechoso.component.html',
  styleUrls: ['./listar-sospechoso.component.css'],
})
export class ListarSospechosoComponent implements OnInit {
  dataSource: MatTableDataSource<Sospechoso> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  obs: Observable<any> | undefined;
  role: string = '';
  constructor(
    private oS: SospechosoService,
    public dialog: MatDialog,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {

    console.log("carga ngoninit")

    this.oS.list().subscribe((data) => {

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });

    this.oS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.role = this.loginService.showRole();
  }

  eliminar(id: number) {
    this.oS.delete(id).subscribe((data) => {
      this.oS.list().subscribe((data) => {
        this.oS.setList(data);

        this.obs = this.dataSource.connect();
      });
    });
  }

  openDialog(idSospechoso: number) {
    this.dialog.open(DialogoConfirmacionComponent)
      .afterClosed()
      .subscribe((confirmacion: Boolean) => {
        if (confirmacion) {
          this.eliminar(idSospechoso);
        }
      });
  }

  reload() {
    this.oS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });

    this.oS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  filter(en: any) {
    this.dataSource.filterPredicate = (data: Sospechoso, filter: string) => {
      return data.entidad.nombre.toLocaleLowerCase().includes(filter) ||
      data.idSospechoso.toLocaleString().includes(filter)  ||
      data.nombre.toLocaleString().includes(filter)  ||
      data.alias.toLocaleString().includes(filter)  ||
      data.descripcion.toLocaleString().includes(filter)  ||
      data.estado.toLocaleString().includes(filter)  ||
      data.genero.toLocaleString().includes(filter)  ||
      data.historial.toLocaleString().includes(filter)  ||
      data.nacionalidad.toLocaleString().includes(filter)
    }

    this.dataSource.filter = en.target.value.trim();
  }
}

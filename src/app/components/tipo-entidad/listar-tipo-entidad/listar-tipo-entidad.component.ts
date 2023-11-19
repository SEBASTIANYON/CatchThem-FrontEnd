import { LoginService } from './../../../services/login.service';
import { TipoEntidad } from './../../../models/TipoEntidad';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TipoEntidadService } from 'src/app/services/tipoentidad.service';

@Component({
  selector: 'app-listar-tipo-entidad',
  templateUrl: './listar-tipo-entidad.component.html',
  styleUrls: ['./listar-tipo-entidad.component.css']
})
export class ListarTipoEntidadComponent implements OnInit {
  dataSource: MatTableDataSource<TipoEntidad> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'idTipo',
    'sector',
  ];
  role: string = ''
  constructor(private iS: TipoEntidadService, private loginService:LoginService) {}
  ngOnInit(): void {
    this.iS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.iS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.role = this.loginService.showRole()
  }

  eliminar(id: number) {
    this.iS.delete(id).subscribe((data) => {
      this.iS.list().subscribe((data) => {
        this.iS.setList(data);
      });
    });
  }

  filter(en:any){
    this.dataSource.filter=en.target.value.trim();
  }
}
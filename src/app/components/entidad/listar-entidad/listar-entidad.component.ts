import { EntidadService } from 'src/app/services/entidad.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Entidad } from 'src/app/models/Entidad';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
    'tipoEntidad'
  ];
  constructor(private uS: EntidadService) {}
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
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
      });
    });
  }

  filter(en:any){
    this.dataSource.filter=en.target.value.trim();
  }
}

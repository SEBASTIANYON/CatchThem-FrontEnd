import { Sospechoso } from './../../../models/Sospechoso';
import { SospechosoService } from './../../../services/sospechoso.service';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-sospechoso',
  templateUrl: './listar-sospechoso.component.html',
  styleUrls: ['./listar-sospechoso.component.css'],
})
export class ListarSospechosoComponent {
  dataSource: MatTableDataSource<Sospechoso> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'idSospechoso',
    'nombre',
    'alias',
    'nacimiento',
    'genero',
    'nacionalidad',
    'descripcion',
    'historial',
    'estado',
    'fecharegistro',
  ];
  constructor(private oS: SospechosoService) {}
  ngOnInit(): void {
    this.oS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.oS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  //se agrega eliminar por id
  eliminar(id: number) {
    this.oS.delete(id).subscribe((data) => {
      this.oS.list().subscribe((data) => {
        this.oS.setList(data);
      });
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}

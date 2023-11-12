import { Component, OnInit, ViewChild } from '@angular/core';
import { SospechosoService } from 'src/app/services/sospechoso.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Sospechoso } from 'src/app/models/Sospechoso';

@Component({
  selector: 'app-listar-sospechoso',
  templateUrl: './listar-sospechoso.component.html',
  styleUrls: ['./listar-sospechoso.component.css'],
})
export class ListarSospechosoComponent implements OnInit {
  dataSource: MatTableDataSource<Sospechoso> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'idSospechoso',
    'nombre',
    'alias',
    'nacimiento',
    'genero',
    'nacionalidad'
  ];
  constructor(private uS: SospechosoService) {}
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

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}

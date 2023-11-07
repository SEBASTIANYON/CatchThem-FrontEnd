import { ActasInterrogatorio } from './../../../models/ActasInterrogatorio';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActasinterrogatorioService } from 'src/app/services/actasinterrogatorio.service';

@Component({
  selector: 'app-listar-actas',
  templateUrl: './listar-actas.component.html',
  styleUrls: ['./listar-actas.component.css']
})
export class ListarActasComponent implements OnInit{
  dataSource: MatTableDataSource<ActasInterrogatorio> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'detalles',
    'fecha',
    'sospechoso',
    'usuario',
    'actualizar',
    'eliminar'
  ];
  constructor(private aS: ActasinterrogatorioService) {}
  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
      });
    });
  }

  filter(en:any){
    this.dataSource.filter=en.target.value.trim();
  }
}

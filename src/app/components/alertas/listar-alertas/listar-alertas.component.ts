import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alerta } from 'src/app/models/Alerta';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-listar-alertas',
  templateUrl: './listar-alertas.component.html',
  styleUrls: ['./listar-alertas.component.css']
})
export class ListarAlertasComponent implements OnInit {
  dataSource: MatTableDataSource<Alerta> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'fecha',
    'tipo',
    'descripcion',
    'ubicacion',
    'gravedad',
    'usuario',
    'actualizar',
    'eliminar'
  ];

  
  constructor(private aS: AlertaService) {}
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

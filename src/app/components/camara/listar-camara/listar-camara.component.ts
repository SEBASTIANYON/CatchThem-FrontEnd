import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Camara } from 'src/app/models/Camara';
import { CamaraService } from 'src/app/services/camara.service';

@Component({
  selector: 'app-listar-camara',
  templateUrl: './listar-camara.component.html',
  styleUrls: ['./listar-camara.component.css']
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
    'accion02'
  ];
  constructor(private uS: CamaraService) {}
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

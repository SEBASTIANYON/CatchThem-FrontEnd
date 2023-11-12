import { ActasInterrogatorio } from './../../../models/ActasInterrogatorio';
import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';

import { ActasinterrogatorioService } from 'src/app/services/actasinterrogatorio.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-actas',
  templateUrl: './listar-actas.component.html',
  styleUrls: ['./listar-actas.component.css']
})
export class ListarActasComponent implements OnInit{
  dataSource: MatTableDataSource<ActasInterrogatorio> = new MatTableDataSource();
  @ViewChild(MatPaginator ,{static: true}) paginator!: MatPaginator;
  listaActas: ActasInterrogatorio[] = []
  obs: Observable<any> | undefined
  role: string = ''
  


  constructor(
    private aS: ActasinterrogatorioService,
    private loginService: LoginService
    ) {}


  ngOnInit(): void {
    

    console.log("carga ngoninit")
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.listaActas = data
      this.obs = this.dataSource.connect()
    });


    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    
    this.role = this.loginService.showRole()
    
    
  }

  
  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
        this.listaActas = data
        this.obs = this.dataSource.connect()
      });
    });

    
  }

  reload(){
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.listaActas = data
      this.obs = this.dataSource.connect()
    });


    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  filter(en:any){
    //filtrar para objetos anidados
    this.dataSource.filterPredicate = (data: ActasInterrogatorio, filter: string) => {
      return data.sospechoso.nombre.toLocaleLowerCase().includes(filter) || 
      data.usuario.nombre.toLocaleLowerCase().includes(filter) ||
      data.detalles.toLocaleLowerCase().includes(filter) ||
      data.id_acta.toLocaleString().includes(filter) ||
      data.fecha.toLocaleString().includes(filter);
    }

    this.dataSource.filter=en.target.value.trim();
  }

  
}

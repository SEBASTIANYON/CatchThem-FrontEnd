import { SospechosoService } from './../../../services/sospechoso.service';
import { Sospechoso } from 'src/app/models/Sospechoso';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-sospechoso',
  templateUrl: './listar-sospechoso.component.html',
  styleUrls: ['./listar-sospechoso.component.css']
})
export class ListarSospechosoComponent implements OnInit {
  public sospechoso: Sospechoso[] = [];

  constructor(private oS: SospechosoService) {}

  ngOnInit(): void {
    this.oS.list().subscribe((data: Sospechoso[]) => {
      this.sospechoso = data;
    });
    this.oS.getList().subscribe((data: Sospechoso[]) => {
      this.sospechoso = data;
    });
  }

  eliminar(id: number) {
    this.oS.delete(id).subscribe((data) => {
      this.oS.list().subscribe((data) => {
        this.oS.setList(data);
      });
    });
  }
}
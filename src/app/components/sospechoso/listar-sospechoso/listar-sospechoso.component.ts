import { SospechosoService } from './../../../services/sospechoso.service';
import { Sospechoso } from 'src/app/models/Sospechoso';
import { Component, OnInit } from '@angular/core';
import { DialogoConfirmacionComponent } from '../../dialog/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-sospechoso',
  templateUrl: './listar-sospechoso.component.html',
  styleUrls: ['./listar-sospechoso.component.css']
})
export class ListarSospechosoComponent implements OnInit {
  public sospechoso: Sospechoso[] = [];
  

  constructor(private oS: SospechosoService, public dialog: MatDialog) {}

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

  openDialog(idSospechoso: number){
    this.dialog.open(DialogoConfirmacionComponent)
    .afterClosed()
    .subscribe((confirmacion: Boolean) => {
      if(confirmacion){
        this.eliminar(idSospechoso)
      }
    })
  }
}
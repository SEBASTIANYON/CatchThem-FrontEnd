import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrls: ['./dialogo-confirmacion.component.css']
})
export class DialogoConfirmacionComponent implements OnInit{
  constructor(public dialog: MatDialogRef<DialogoConfirmacionComponent>){}

  closeDialog(){
    this.dialog.close(false)
  }

  confirmDialog(){
    this.dialog.close(true)
  }

  ngOnInit(): void {
    
  }

}

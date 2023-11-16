import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-mapa',
  templateUrl: './dialogo-mapa.component.html',
  styleUrls: ['./dialogo-mapa.component.css']
})
export class DialogoMapaComponent implements OnInit{
  
  mapOptions: google.maps.MapOptions = {
    center :{
      lat: 0,
      lng: 0
    },
    zoom: 18
  }

  position = {
    lat: 0,
    lng: 0
  }

  constructor(
    public dialog: MatDialogRef<DialogoMapaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){}

  

  ngOnInit(): void {
    //data is like this(-12.01923, -55.09123)
    //get both coordinates into two different numeric variables
    let coordinates = this.data.substring(1, this.data.length - 1).split(', ');
    let lat = Number(coordinates[0]);
    let lng = Number(coordinates[1]);

    console.log(lat,', ',lng)

    this.mapOptions.center = {
      lat: lat,
      lng: lng
    };

    this.position = {
      lat: lat,
      lng: lng
    }
  }
}

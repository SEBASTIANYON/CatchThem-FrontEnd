import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css']
})
export class CamaraComponent {

  constructor(public route:ActivatedRoute){}
}

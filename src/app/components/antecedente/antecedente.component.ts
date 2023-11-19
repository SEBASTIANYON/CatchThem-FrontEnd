import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-antecedente',
  templateUrl: './antecedente.component.html',
  styleUrls: ['./antecedente.component.css']
})
export class AntecedenteComponent {

  constructor(public route:ActivatedRoute){}
}


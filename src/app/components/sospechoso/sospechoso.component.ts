import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sospechoso',
  templateUrl: './sospechoso.component.html',
  styleUrls: ['./sospechoso.component.css'],
})
export class SospechosoComponent {
  constructor(public route: ActivatedRoute) {}
}

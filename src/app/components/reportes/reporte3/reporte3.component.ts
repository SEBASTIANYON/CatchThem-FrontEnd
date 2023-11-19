import { Component , OnInit } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { ChartType } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { EntidadService } from 'src/app/services/entidad.service';

@Component({
  selector: 'app-reporte3',
  templateUrl: './reporte3.component.html',
  styleUrls: ['./reporte3.component.css']
})
export class Reporte3Component implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor ( private eS: EntidadService){}

  ngOnInit(): void {

    this.eS.cantidadSospechosos().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.namesEntidad);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadSospechosos),
          label: 'Cantidad de sospechosos',
          backgroundColor: 'rgba(0, 130, 0, 0.5)',
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
import { AntecedentePenalService } from './../../../services/antecedentepenal.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { ChartType } from 'chart.js';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-reporte4',
  templateUrl: './reporte4.component.html',
  styleUrls: ['./reporte4.component.css'],
})
export class Reporte4Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //para cambiar el tipo del gráfico
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private aS: AntecedentePenalService) {}

  ngOnInit(): void {
    this.aS.getCount().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.antecedentesPorDelito);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_antecedentes),
          label: 'Cantidad de antecedentes por delito',
          backgroundColor: ['#ABABA9','#B8A392', '#F2EAE2', '#A48C79', '#323131','#46433F', '#A19794', '#FAF9F7'],
          borderColor: 'white',
        },
      ];
    });
  }
}

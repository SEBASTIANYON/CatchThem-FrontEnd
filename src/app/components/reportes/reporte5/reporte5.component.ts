import { Component, OnInit } from '@angular/core';
import { SospechosoService } from './../../../services/sospechoso.service';
import { ChartDataset, ChartType, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-reporte5',
  templateUrl: './reporte5.component.html',
  styleUrls: ['./reporte5.component.css']
})

export class Reporte5Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Establece el tamaño del paso en el eje y
        },
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            if (label) {
              return `${label}: ${context.parsed.y}`;
            }
            return `${context.parsed.y}`;
          },
        },
      },
    },
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar'; // Cambiado a 'bar' para un gráfico de barras
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private oS: SospechosoService) {}

  ngOnInit(): void {
    this.oS.getCantidadSospechosoPorNaci().subscribe((data: any[]) => {
      this.barChartLabels = data.map((item: any) => item.nacionalidad);
      this.barChartData = [
        {
          data: data.map((item: any) => item.promedio),
          label: 'Cantidad de sospechosos por nacionalidad',
          backgroundColor: ['#ABABA9','#B8A392', '#F2EAE2', '#A48C79', '#323131','#46433F', '#A19794', '#FAF9F7'],
          borderColor: 'white',
        },
      ];
    });
  }
}

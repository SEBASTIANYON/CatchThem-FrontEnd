import { Component, OnInit } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { ChartType } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { EntidadService } from 'src/app/services/entidad.service';

@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css'],
})
export class Reporte2Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  //Para el grafico 1
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  //Para el grafico 2
  barChartLabels2: string[] = [];
  barChartType2: ChartType = 'bar';
  //barChartLegend2 = true;
  barChartData2: ChartDataset[] = [];

  colores: string[] = [];

  constructor(private eS: EntidadService) {}

  ngOnInit(): void {
    this.eS.getEdadPromedio().subscribe((data) => {

      //this.colores= this.generateColoresRandom(data.length);
      this.colores= ['#ABABA9','#4E4945', '#CCB4A1', '#DBCDC0', '#383735']
      this.barChartLabels = data.map((item) => item.namesEntidad);
      this.barChartData = [
        {
          label: 'Edad promedio',
          data: data.map((item) => item.edadPromedio),
          type: 'bar',
          backgroundColor: ['#ABABA9','#B8A392', '#F2EAE2', '#A48C79', '#323131','#46433F', '#A19794', '#FAF9F7'],
          borderColor: 'rgba(192, 192, 192, 1)',
          borderWidth: 2,
        },
      ];
      /*
      this.barChartLabels2 = data.map((item) => item.namesEntidad);
      this.barChartData2 = [
        {
          label: 'Cantidad de Sospechosos',
          data: data.map((item) => item.cantidadSospechosos),
          type: 'doughnut',
          backgroundColor: this.colores,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ];
      */
    });
  }

  /*
  generateColoresRandom(count: number): string[] {
    const colores = [];
    for (let i = 0; i < count; i++) {
      //Esta linea me calcula un color aleatorio
      const colorRandom = `rgba(${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, 0.7)`;
      colores.push(colorRandom);
    }

    return colores;
  }
  */
}

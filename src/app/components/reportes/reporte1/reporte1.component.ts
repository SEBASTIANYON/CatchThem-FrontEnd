import { Component, OnInit } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { ChartType } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { EntidadService } from 'src/app/services/entidad.service';

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html',
  styleUrls: ['./reporte1.component.css']
})
export class Reporte1Component implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
    
  }
  

  barChartLabels: string[] = []
  barChartType: ChartType = 'pie'
  barChartLegend = true
  barChartData: ChartDataset[] = []

  constructor(private eS: EntidadService) {}
  ngOnInit(): void {
    this.eS.getCantidadDeCamaras().subscribe((data) => {
      this.barChartLabels = data.map(item => item.nombreEntidad)
      this.barChartData = [
        {
          data:data.map(item => item.cantidadCamaras),
          label: 'Cantidad de cursos por universidad',
          backgroundColor: ['#ABABA9','#4E4945', '#CCB4A1', '#DBCDC0', '#383735']
        }
        
      ]
    })
  }

}

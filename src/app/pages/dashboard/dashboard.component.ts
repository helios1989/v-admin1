import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [HighchartsChartModule],
})
export class DashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  constructor() {
    console.log('dashboard');
  }
  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'bar',
        data: [1, 2, 3, 4, 5],
      },
    ],
  };
}

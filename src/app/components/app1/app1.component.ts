import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

HC_exporting(Highcharts);

@Component({
  selector: 'app-comopnent1',
  template: `<highcharts-chart [Highcharts]="Highcharts" [(update)]="updateFlag" [options]="chartOptions" (chartInstance)="onChartInstance($event)">{{updateFlag}}</highcharts-chart>`,
  styleUrls: ['./app1.component.css']
})
export class App1Component implements AfterViewInit {
  Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  chart!: Highcharts.Chart;
  updateFlag: boolean = false;
  @ViewChild(HighchartsChartComponent) chartComponent!: HighchartsChartComponent;

  ngAfterViewInit() {

    this.chartOptions = {
      title: {
        text: `Energy Forecast ${this.updateFlag}` 
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Energy Types',
        },
        categories: ['Solar', 'Wind', 'Hydro'], // Labels for energy types
      },
      legend: {
        layout: 'vertical',
        align: 'center',
        verticalAlign: 'middle'
      },
      series: [
        {
          type: 'line',
          name: 'Actual Solar',
          color: 'red', // Set the color for actual data
          data: [
            [Date.UTC(2023, 0, 1), 50],
            [Date.UTC(2023, 0, 2), 55],
            [Date.UTC(2023, 0, 3), 60],
            [Date.UTC(2023, 0, 4), 65],
            [Date.UTC(2023, 0, 5), 70],
            [Date.UTC(2023, 0, 6), 75],
          ]
        },
        {
          type: 'line',
          name: 'Forecast Solar',
          color: 'blue', // Set the color for forecast data
          data: [
            [Date.UTC(2023, 0, 2), 55],
            [Date.UTC(2023, 0, 3), 60],
            [Date.UTC(2023, 0, 4), 65],
            [Date.UTC(2023, 0, 5), 70],
            [Date.UTC(2023, 0, 6), 75],
          ]
        }
      ], // Close the series array
      plotOptions: {
        series: {
          point: {
            events: {
              mouseOver: this.highlightDataPoint.bind(this)
            }
          }
        }
      }
    }; // Close the chartOptions object
    this.updateFlag = true;
  }
  
  

  onChartInstance(instance: Highcharts.Chart) {
    this.chart = instance;
  }

  highlightDataPoint(event: any) {
    const point = event.target;
    const renderer = this.chart.renderer;
    console.log(event.target.y,'target')
    const xCategoryIndex = point.index;
    const x = 1;
    const y = point.plotY + this.chart.plotTop;
  
    const circle = renderer.circle(x, y, 10).attr({
      fill: 'yellow',
      stroke: 'black',
      'stroke-width': 2
    }).add();
  
    const label = renderer.label('Highlight! ' +  event.target.y, x + 15, y - 10)
      .css({
        color: 'black'
      })
      .add();
  }
  
  
}

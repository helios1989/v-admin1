import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent,  } from 'highcharts-angular';
import {
  BreakpointObserver,
  BreakpointState
} from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],

})
export class ChartComponent implements AfterViewInit, OnDestroy {
  myProperty: string = '';
  Highcharts: typeof Highcharts = Highcharts;
  chart!: Highcharts.Chart;
  updateFlag: boolean = false;
  userRole: string = 'user';
  @ViewChild('chartContainer', { static: false }) chartContainer!: HighchartsChartComponent;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    console.log('hello');
  }
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Energy Forecast'
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
  
    ],


  };
  
  ngAfterViewInit(): void {
    window.addEventListener('resize', this.reflowChart);
    this.applyAdditionalStyles();
  }
  
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.reflowChart);
  }
  private applyAdditionalStyles(): void {
    // Example: Modify the font size of a chart title using Renderer2
    const chartTitle = this.el.nativeElement.querySelector('.highcharts-title');
    this.renderer.setStyle(chartTitle, 'font-size', '60px');

    // Example: Add a border to chart container
    const chartContainer = this.el.nativeElement.querySelector('.chart-container');
    this.renderer.setStyle(chartContainer, 'border', '1px solid black');

    // ... other DOM manipulations
  }
  private reflowChart = () => {
    const chartContainer = this.el.nativeElement.querySelector('.chart-container');
    this.renderer.setStyle(chartContainer, 'background-color', 'lightgray');
    this.chartOptions.series =  [
      {
        type: 'line',
        name: 'Actual Solar',
        color: 'red', // Set the color for actual data
        data: [
          [Date.UTC(2023, 0, 1), 150],
          [Date.UTC(2023, 0, 2), 55],
          [Date.UTC(2023, 0, 3), 60],
          [Date.UTC(2023, 0, 4), 5],
          [Date.UTC(2023, 0, 5), 70],
          [Date.UTC(2023, 0, 6), 175],
        ]
      },
      {
        type: 'line',
        name: 'Forecast Solar',
        color: 'blue', // Set the color for forecast data
        data: [
          [Date.UTC(2023, 0, 2), 355],
          [Date.UTC(2023, 0, 3), 60],
          [Date.UTC(2023, 0, 4), 365],
          [Date.UTC(2023, 0, 5), 570],
          [Date.UTC(2023, 0, 6), 375],
        ]
      },
      // Repeat the same structure for other energy types
    ],
    // this.chartOptions.responsive = {
    //   rules: [{
    //     condition: {
    //       maxWidth: 500
    //     },
    //     chartOptions: {
    //       legend: {
    //         align: 'center',
    //         verticalAlign: 'bottom',
    //         layout: 'horizontal'
    //       }
    //     }
    //   }]
    // };

    this.updateFlag = true;
  };

  chartCallback: Highcharts.ChartCallbackFunction = (chartRef) => {
    this.chart = chartRef;
  }
}

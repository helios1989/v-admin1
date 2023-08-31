import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
// import { WorldMapChartComponent } from './components/world-map-chart/world-map-chart.component';
import { ChartComponent } from './components/features/pages/chart/chart.component';
import { BarComponent } from './components/features/pages/bar/bar.component';
import { SignalsComponent } from './components/features/pages/signals/signals.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/features/pages/cart/cart.component';
import { ButtonComponent } from './components/button/button.component';
import { CommonModule } from '@angular/common';
import { Test1Component } from './components/feature/test1/test1.component';
import { FormsModule } from '@angular/forms';
import { App1Component } from './components/app1/app1.component';
import { Renderexample1Component } from './components/renderexample1/renderexample1.component';
import { ChildExampleComponent } from './components/child-example/child-example.component';
import { OnPushExampleComponent } from './components/onpushexample/onpushexample.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    // WorldMapChartComponent,
    BarComponent,
    ChartComponent,
    SignalsComponent,
    CartComponent,
    ButtonComponent,
    Test1Component,
    App1Component,
    Renderexample1Component,
    ChildExampleComponent,
    OnPushExampleComponent
    // DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HighchartsChartModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

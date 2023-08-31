import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { BarComponent } from './bar/bar.component';
import { SignalsComponent } from './signals/signals.component';


const routes: Routes = [
  // { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // // tslint:disable-next-line: max-line-length
  // { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
  // { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AuthGuard] },
  { path: 'chart', component: ChartComponent, },
  { path: 'chart/:chartId?', component: ChartComponent, },
  { path: 'bar', component: BarComponent },
  { path: 'signals', component: SignalsComponent}
];

@NgModule({
  // declarations: [ButtonComponent],
  imports: [RouterModule.forChild(routes), HighchartsChartModule],
  exports: [RouterModule, ]
})
export class PagesRoutingModule { }
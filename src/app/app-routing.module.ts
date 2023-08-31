import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
const routes: Routes = [
  // { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // // tslint:disable-next-line: max-line-length
  // { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
  { path: 'pages', loadChildren: () => import('./components/features/pages/pages-routing.module').then(m => m.PagesRoutingModule)},
  // { path: 'crypto-ico-landing', component: CyptolandingComponent },
  { path: 'testing', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule { }

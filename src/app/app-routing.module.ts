import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Navigation/home/home.component';


const routes: Routes = [
  { path: 'Start', component: HomeComponent, pathMatch: 'full' },
  { path: 'Inicio', loadChildren: () => import('./Main/main.module').then(m => m.MainModule)},
  { path: '', redirectTo: 'Start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { MainAppComponent } from './main-app';


const routes: Routes = [
    { path: '', component: MainAppComponent,
    children: [
        { path: '', component: MainComponent, pathMatch: 'full' }
    ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class MainRouterModule {}

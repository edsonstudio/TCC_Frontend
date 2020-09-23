import { NgModule } from '@angular/core';

import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { MainAppComponent } from './main-app';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SharedModule } from '../components/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        MainComponent,
        MainAppComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        TooltipModule.forRoot(),
        SharedModule
    ],
    exports: [ MainComponent ]
})

export class MainModule {}

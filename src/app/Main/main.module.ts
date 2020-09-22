import { NgModule } from '@angular/core';

import { MainComponent } from './main/main.component';
import { MainRouterModule } from './main-routing.module';
import { MainAppComponent } from './main-app';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CardComponent } from '../components/card/card.component';
import { SharedModule } from '../components/shared.module';

@NgModule({
    declarations: [
        MainComponent,
        MainAppComponent
    ],
    imports: [
        MainRouterModule,
        TooltipModule.forRoot(),
        SharedModule
    ],
    exports: [ MainComponent ]
})

export class MainModule {}

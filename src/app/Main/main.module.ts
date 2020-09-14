import { NgModule } from '@angular/core';

import { MainComponent } from './main/main.component';
import { MainRouterModule } from './main-routing.module';
import { MainAppComponent } from './main-app';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CardComponent } from '../components/card/card.component';

@NgModule({
    declarations: [
        MainComponent,
        MainAppComponent,
        CardComponent
    ],
    imports: [
        MainRouterModule,
        TooltipModule.forRoot()
    ],
    exports: [ MainComponent ]
})

export class MainModule {}

import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { MainRouterModule } from './main-routing.module';
import { MainAppComponent } from './main-app';

@NgModule({
    declarations: [ MainComponent, MainAppComponent ],
    imports: [ MainRouterModule ],
    exports: [ MainComponent ]
})

export class MainModule {}

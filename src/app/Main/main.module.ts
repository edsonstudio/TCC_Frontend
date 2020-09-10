import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { MainRouterModule } from './main-routing.module';

@NgModule({
    declarations: [ MainComponent ],
    imports: [ MainRouterModule ],
    exports: [ MainComponent ]
})

export class MainModule {}

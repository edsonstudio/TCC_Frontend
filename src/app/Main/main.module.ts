import { NgModule } from '@angular/core';

import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { MainAppComponent } from './main-app';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SharedModule } from '../components/shared.module';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/User/user.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    declarations: [
        MainComponent,
        MainAppComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        TooltipModule.forRoot(),
        SharedModule,
        NgxSpinnerModule
    ],
    exports: [ MainComponent ],
    providers: [AccountService]
})

export class MainModule {}

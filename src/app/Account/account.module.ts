import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAppComponent } from './account-app';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule
    ],
    declarations: [
        AccountAppComponent
    ]
})

export class AccountModule {}

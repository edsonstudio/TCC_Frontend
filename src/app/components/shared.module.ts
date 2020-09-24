import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomFormsModule } from 'ngx-custom-validators';
import { CardComponent } from './card/card.component';
import { FormComponent } from './form/form.component';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule,
        CustomFormsModule
    ],
    declarations: [
        CardComponent,
        FormComponent
    ],
    exports: [
        CardComponent,
        FormComponent
    ]
})

export class SharedModule {}

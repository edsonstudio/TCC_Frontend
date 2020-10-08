import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgBrazil } from 'ng-brazil';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ProductRouterModule } from '../Products/product-routing.module';
import { CardComponent } from './card/card.component';
import { FormComponent } from './form/form.component';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { CategoryNamePipe } from '../pipes/categoryName.pipe';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};
@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule,
        CustomFormsModule,
        ProductRouterModule,
        NgBrazil,
        SwiperModule
    ],
    declarations: [
        CardComponent,
        FormComponent,
        CategoryNamePipe
    ],
    exports: [
        CardComponent,
        FormComponent,
        CategoryNamePipe
    ],
    providers: [
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        }
    ]
})

export class SharedModule {}

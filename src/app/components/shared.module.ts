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
import { CartComponent } from './cart/cart.component';
import { TextMaskModule } from 'angular2-text-mask';
import { InputMaskDirective } from './input-mask.directive';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
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
        TextMaskModule,
        SwiperModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
        CardComponent,
        FormComponent,
        CategoryNamePipe,
        CartComponent,
        InputMaskDirective
    ],
    exports: [
        CardComponent,
        FormComponent,
        CategoryNamePipe,
        CartComponent,
        InputMaskDirective
    ],
    providers: [
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        }
    ]
})

export class SharedModule {}

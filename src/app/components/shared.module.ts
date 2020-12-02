import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgBrazil } from 'ng-brazil';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ProductRouterModule } from '../Products/product-routing.module';
import { CardComponent } from './card/card.component';
import { FormComponent } from './form/form.component';
import { CategoryNamePipe } from '../pipes/categoryName.pipe';
import { CartComponent } from './cart/cart.component';
import { TextMaskModule } from 'angular2-text-mask';
import { InputMaskDirective } from './input-mask.directive';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { UserNamePipe } from '../pipes/userName.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { PsidebarComponent } from './psidebar/psidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CarouselModule } from 'primeng/carousel';
import { ChatService } from '../services/Chat/chat.service';
import { Store } from '../Products/cart.store';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { CartService } from '../services/Cart_Order/cart.service';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule,
        CustomFormsModule,
        ProductRouterModule,
        TooltipModule,
        NgBrazil,
        TextMaskModule,
        NgxMaskModule.forRoot(),
        SidebarModule,
        RippleModule,
        ButtonModule,
        CarouselModule,
        PasswordModule,
        InputTextModule,
        TableModule,
        RatingModule,
        PanelModule,
        ToastModule,
        ProgressSpinnerModule,
        BreadcrumbModule,
        ToolbarModule,
        SplitButtonModule,
        MenubarModule
    ],
    declarations: [
        CardComponent,
        FormComponent,
        CategoryNamePipe,
        CartComponent,
        InputMaskDirective,
        UserNamePipe,
        NavbarComponent,
        PsidebarComponent
    ],
    exports: [
        CardComponent,
        FormComponent,
        CategoryNamePipe,
        UserNamePipe,
        CartComponent,
        InputMaskDirective,
        NavbarComponent,
        PsidebarComponent
    ],
    providers: [
        ChatService,
        Store,
        MessageService,
        CartService
    ]
})

export class SharedModule {}

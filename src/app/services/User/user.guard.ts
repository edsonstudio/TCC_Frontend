import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { RegisterComponent } from 'src/app/Account/register/register.component';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Injectable()
export class GuardAccount implements CanDeactivate<RegisterComponent>, CanActivate {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: RegisterComponent) {
        if (component.changesNotSaved) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario ?');
        }

        return true;
    }

    canActivate() {
        if (this.localStorageUtils.getUserToken()){
            this.router.navigate(['/Inicio']);
        }

        return true;
    }

}

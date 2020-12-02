import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageUtils } from '../utils/localstorage';

export abstract class CommumMethods {
    constructor(){}
    private localStorage = new LocalStorageUtils();

    protected LoadingSpinner(route: Router, spinner: NgxSpinnerService){
        route.events.subscribe(event => {
            if (event instanceof NavigationStart){
                spinner.show();
            }
            if (event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError){
                    setTimeout(() => {
                        spinner.hide();
                    }, 3000);
                }
        });
    }

    protected isAdmin(): boolean{
        const claim = {name: 'Products', value: 'Editar, Adicionar, Excluir'};
        const user = this.localStorage.getUser();

        if (!user){
            return false;
        }

        if (!user.claims){
            return false;
        }

        const userClaims = user.claims.find(x => x.type === claim.name);

        if (!userClaims){
            return false;
        }

        const uservalues: Array<string> = userClaims.value.split(',');
        const localvalues: Array<string> = claim.value.split(',');

        let cont = 0;
        localvalues.forEach(local => {
            uservalues.forEach(userc => {
                if (local.includes(userc)){
                    cont++;
                }
            });
        });

        if (cont < localvalues.length){
            return false;
        }

        return true;
    }

}

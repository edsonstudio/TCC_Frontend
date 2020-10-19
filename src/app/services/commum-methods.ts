import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

export abstract class CommumMethods {
    constructor(){}

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
}

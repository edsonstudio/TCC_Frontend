import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Injectable()
export class UserAccessGuard implements CanActivate{

    localStorage = new LocalStorageUtils();

    constructor(private route: Router){}

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        if (!this.localStorage.getUserToken()){
            this.route.navigate(['/Inicio/conta/entrar']);
        }

        const user = this.localStorage.getUser();
        const claim = routeAc.data[0];

        if (claim !== undefined){
            const claim = routeAc.data[0].claim;

            if (claim){
                if (!user.claims){
                    this.accessDenied();
                }

                const userClaims = user.claims.find(x => x.type === claim.name);

                if (!userClaims){
                    this.accessDenied();
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
                    this.accessDenied();
                }
            }
        }

        return true;
    }

    accessDenied(){
        this.route.navigate(['/Inicio/conta/entrar']);
    }
}

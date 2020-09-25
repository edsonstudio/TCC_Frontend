import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Injectable()
export class UserAccessGuard implements CanActivate{

    localStorage = new LocalStorageUtils();

    constructor(private route: Router){}

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        if (!this.localStorage.getUserToken()){
            this.route.navigate(['conta/login']);
        }

        const user = this.localStorage.getUser();
        const claim = routeAc.data[0];

        if (claim !== undefined){
            let claim = routeAc.data[0].claim;

            if (claim){
                if (!user.claims){
                    this.accessDenied();
                }

                const userClaims = user.claims.find(x => x.type === claim.name);

                if (!userClaims){
                    this.accessDenied();
                }

                const claimsValue = userClaims.value as string;

                if (!claimsValue.includes(claim.value)){
                    this.accessDenied();
                }
            }
        }

        return true;
    }

    accessDenied(){
        this.route.navigate(['conta/login']);
    }
}

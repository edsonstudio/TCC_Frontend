import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  routeLoading: boolean = false;

  constructor(
    private acts: AccountService,
    private spinner: NgxSpinnerService,
    private router: Router) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart){
          this.spinner.show();
        }

        if (event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError){
              setTimeout(() => {
                this.spinner.hide();
              }, 3000);
        }
      });
     }

  ngOnInit(): void {
  }

  logout(){
    this.acts.LocalStorage.cleanUserLocalData();
  }

}

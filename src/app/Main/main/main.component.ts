import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommumMethods } from 'src/app/services/commum-methods';
import { AccountService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends CommumMethods implements OnInit {

  constructor(
    private acts: AccountService,
    private spinner: NgxSpinnerService,
    private router: Router) {
      super();
      this.LoadingSpinner(this.router, this.spinner);
     }

  ngOnInit(): void {
  }

  logout(){
    this.acts.LocalStorage.cleanUserLocalData();
  }

}

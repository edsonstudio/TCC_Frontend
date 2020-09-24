import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/User';

import { AccountService } from 'src/app/services/User/user.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User;
  errosResponse: string[];
  cleanForm = false;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  register(event: User){
    this.user = event;
    this.accountService.registerUser(this.user).subscribe(
      success => {
        this.processSuccess(success);
      },
      fail => {
        this.errosResponse = fail.error.errors;
        this.cleanForm = false;
      }
    );
  }

  processSuccess(response){
        this.cleanForm = true;
        this.errosResponse = [];
        console.clear();

        this.accountService.LocalStorage.saveUserLocalData(response);

        this.toastr.success('Cadastro feito com sucesso!', 'Sucesso', {
          progressBar: true,
          easing: 'ease',
        });

        setTimeout(() => {
          this.router.navigate(['/Inicio']);
        }, 5000);
  }
}

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/User';

import { AccountService } from 'src/app/services/User/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnChanges {

  user: User;
  errorsResponse: string[];
  cleanForm = false;
  changesNotSaved: boolean;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit() {
  }


  register(event: User){
    this.user = event;
    this.accountService.registerUser(this.user).subscribe(
      success => {
        this.processSuccess(success);
      },
      fail => {
        this.errorsResponse = fail.error.errors;
        this.cleanForm = false;
      }
    );
  }

  processSuccess(response){
        this.cleanForm = true;
        this.errorsResponse = [];
        console.clear();

        this.accountService.LocalStorage.saveUserLocalData(response);

        const toastr = this.toastr.success('Cadastro feito com sucesso!', 'Sucesso', {
          progressBar: true,
          easing: 'ease',
        });
        if (toastr){
          toastr.onHidden.subscribe(() => {
            this.router.navigate(['/Inicio']);
          });
        }
  }
}

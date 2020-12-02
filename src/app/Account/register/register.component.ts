import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/User';

import { AccountService } from 'src/app/services/User/user.service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User;
  errorsResponse: string[];
  cleanForm = false;
  changesNotSaved: boolean;
  bread: MenuItem[] = [
    {label: 'Cadastrar'}
  ];
  home = {icon: 'pi pi-home', routerLink: '/Inicio'};

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
    ) { }


  ngOnInit() {
    this.errorsResponse = [];
  }


  register(event: User){
    this.user = event;
    console.log(event);
    this.accountService.registerUser(this.user).subscribe(
      success => {
        this.processSuccess(success);
      },
      fail => {
        this.errorsResponse = [];
        if (fail.error.errors.Name){
          const nameError = fail.error.errors.Name;
          nameError.forEach(element => {
            this.errorsResponse.push(element);
          });
        }
        if (fail.error.errors.Cpf){
          const cpfError = fail.error.errors.Cpf;
          cpfError.forEach(element => {
            this.errorsResponse.push(element);
          });
        }
        if (fail.error.errors.Phone){
          const phoneError = fail.error.errors.Phone;
          phoneError.forEach(element => {
            this.errorsResponse.push(element);
          });
        }
        if (fail.error.errors.Email){
          const emailError = fail.error.errors.Email;
          emailError.forEach(element => {
            this.errorsResponse.push(element);
          });
        }
        if (fail.error.errors.Password){
          const pwdError = fail.error.errors.Password;
          pwdError.forEach(element => {
            this.errorsResponse.push(element);
          });
        }
        if (fail.error.errors.ConfirmPassword){
          const cpwdError = fail.error.erros.ConfirmPassword;
          cpwdError.forEach(element => {
            this.errorsResponse.push(element);
          });
        }
        if (fail.error.errors.Mensagens){
          const errors = fail.error.errors.Mensagens;
          errors.forEach(element => {
            this.errorsResponse.push(element);
          });
        }
        this.cleanForm = false;
      }
    );
  }

  processSuccess(response){
        this.cleanForm = true;
        this.changesNotSaved = false;
        this.errorsResponse = [];
        console.clear();

        this.accountService.LocalStorage.saveUserLocalData(response);

        const toastr = this.toastr.success('Cadastro feito com sucesso!', 'Massa', {
          progressBar: true,
          easing: 'ease',
          timeOut: 2000
        });
        if (toastr){
          toastr.onHidden.subscribe(() => {
            this.router.navigate(['/Inicio']);
          });
        }
  }
}

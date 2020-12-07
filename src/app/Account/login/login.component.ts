import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, MessageService } from 'primeng/api';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  user: User;
  cleanForm = false;
  errorsResponse: string[];
  returnUrl: string;
  bread: MenuItem[] = [
    {label: 'Entrar'}
  ];
  home = {icon: 'pi pi-home', routerLink: '/Inicio'};

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
  }

  ngOnInit() {
    this.spinner.show('initial');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spinner.hide('initial');
    }, 1500);
  }

  login(event){
    this.user = event;
    this.accountService.Login(this.user).subscribe(
      success => {
        this.processSuccess(success);
      },
      error => {
        this.proccessFail(error);
       }
    );

  }

  processSuccess(response){
    this.cleanForm = true;
    this.errorsResponse = [];

    this.accountService.LocalStorage.saveUserLocalData(response);
    console.log('logado');

    const toastr = this.toastr.success('Login realizado com sucesso!', 'Logado');
    if (toastr){
      toastr.onHidden.subscribe(() => {
        this.returnUrl
        ? this.router.navigate([this.returnUrl])
        : this.router.navigate(['/Inicio']);
      });
    }
  }

  proccessFail(response){
    this.errorsResponse = response.error.errors.Mensagens;
    this.toastr.error(this.errorsResponse.length > 0 && this.errorsResponse.length < 2 ? 'Ocorreu um erro'
    : `Ocorreram ${this.errorsResponse.length} erros`, 'Opa :(');
  }
}

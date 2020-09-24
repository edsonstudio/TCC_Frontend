import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CustomValidators } from 'ngx-custom-validators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {

  pwd: FormControl;
  confirmPwd: FormControl;
  faUser = faUser;
  formLoRe: FormGroup;
  private _cleanForm: boolean;

  constructor(private fb: FormBuilder) { }
  get cleanForm(){
    return this._cleanForm;
  }

  @Input()
    set cleanForm(val){
      this._cleanForm = val;
      if (this.cleanForm){
        this.formLoRe.reset();
      }
    }


  @Input()
    mode: string;

  @Input()
    erros: string[];

  @Output()
    form: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.validate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    changes.cleanForm = changes.cleanForm.currentValue;
  }


  validate(){
     this.pwd = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 100])]);
     this.confirmPwd = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 100]),
    CustomValidators.equalTo(this.pwd)]);

     this.formLoRe = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: this.pwd,
      confirmPassword: this.confirmPwd
    });
  }

  emitRegister(){
    const formLog = Object.assign({}, this.formLoRe.value);

    this.form.emit(formLog);
  }

  emitLogin(){
    const formReg = {email: this.formLoRe.get('email').value,
    password: this.formLoRe.get('password').value};

    this.form.emit(formReg);
  }

}

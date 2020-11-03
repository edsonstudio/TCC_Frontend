import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ngx-custom-validators';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {
  public MASKS = MASKS;
  constructor(private fb: FormBuilder) { }

  pwd: FormControl;
  confirmPwd: FormControl;
  faUser = faUser;
  formLoRe: FormGroup;
  private dirty = false;

  private _cleanForm: boolean;

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
    errors: string[];

  @Output()
    form: EventEmitter<any> = new EventEmitter();

  @Output()
    formDirty: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    this.validate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.cleanForm){
      changes.cleanForm = changes.cleanForm.currentValue;
    }
  }


  validate(){
     this.pwd = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 100])]);
     this.confirmPwd = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 100]),
    CustomValidators.equalTo(this.pwd)]);

     this.formLoRe = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [NgBrazilValidators.telefone, Validators.required]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      name: ['', [Validators.required, Validators.minLength(10)]],
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

  dirtyForm(){
    this.dirty = true;
    this.formDirty.emit(this.dirty);
  }

}

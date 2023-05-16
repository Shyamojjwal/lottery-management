import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '@app-core/services';
import { AuthService } from '@app-modules/auth-pages/services';
import { checkFormValidation, makeAllFormControlAsDirty, noWhitespaceValidator } from '@app-shared/helper/shared-functions';
import { userForgotPassValidationMessage } from '@app-shared/helper/validation-messages';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, AfterViewChecked {

  public userForm: FormGroup | any;
  public validationMessages: any = null;
  public isFormReadOnly: boolean = true;
  public isFormSubmitted: boolean = false;

  constructor(
    private FB: FormBuilder,
    private _apiService: AuthService,
    private _sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.initUserForm();
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.isFormReadOnly = false;
    }, 1000);
  }

  initUserForm = () => {
    this.userForm = this.FB.group({
      userAuth: ['', [Validators.required, noWhitespaceValidator]]
    })
  }

  trimAndValidateUserForm = (_field: string) => {
    this.userForm.get(_field).setValue(this.userForm.get(_field).value.trim());

    this.validateUserForm();
  };

  validateUserForm = () => {
    this.validationMessages = checkFormValidation(this.userForm, userForgotPassValidationMessage);
    console.log("validationMessages: ", this.validationMessages)
  };

  submitUserForm = () => {
    this._sharedService.showProgress();
    
    if (!this.userForm.valid) {
      makeAllFormControlAsDirty(this.userForm);
      this.validateUserForm();
      this.isFormSubmitted = false;
      this._sharedService.hideProgress();
      return;
    }
    
    this.isFormSubmitted = true;
    
    this._apiService.userForgotPass(this.userForm.value.userAuth).subscribe({
      next: (_res: any) => {
        console.log(_res);
        this._sharedService.hideProgress();
      },
      error: (_err: any) => {
        console.error("Error: ", _err);
        this.userForm.get('userAuth').setErrors({ wrongUserName: true });
        makeAllFormControlAsDirty(this.userForm);
        this.validateUserForm();

        this.isFormSubmitted = false;
        this._sharedService.hideProgress();
      }
    });
  }

}

import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '@app-core/services';
import { AuthService } from '@app-modules/auth-pages/services';
import { AppCookieService } from '@app-services/app-cookie.service';
import { checkFormValidation, makeAllFormControlAsDirty, noWhitespaceValidator } from '@app-shared/helper/shared-functions';
import { userSignInValidationMessage } from '@app-shared/helper/validation-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {

  public userSignInForm: FormGroup | any;
  public validationMessages: any = null;
  public isFormReadOnly: boolean = true;
  public isFormSubmitted: boolean = false;

  constructor(
    private router: Router,
    private FB: FormBuilder,
    private _apiService: AuthService,
    private _sharedService: SharedService,
    private _cookieService: AppCookieService
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.isFormReadOnly = false;
    }, 1000);
  }

  initLoginForm = () => {
    this.userSignInForm = this.FB.group({
      // userAuth: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), this.noWhitespaceValidator]],
      userAuth: ['', [Validators.required, noWhitespaceValidator]],
      userPass: ['', [Validators.required, noWhitespaceValidator]]
    })
  }

  get g() {
    return this.userSignInForm.controls;
  };

  trimAndValidateUserForm = (_field: string) => {
    this.userSignInForm.get(_field).setValue(this.userSignInForm.get(_field).value.trim());

    this.validateUserForm();
  };

  validateUserForm = () => {
    this.validationMessages = checkFormValidation(this.userSignInForm, userSignInValidationMessage);
    console.log("validationMessages: ", this.validationMessages)
  };

  doUserLogin = () => {
    this._sharedService.showProgress();

    if (!this.userSignInForm.valid) {
      makeAllFormControlAsDirty(this.userSignInForm);
      this.validateUserForm();
      this.isFormSubmitted = false;
      this._sharedService.hideProgress();
      return;
    }

    this.isFormSubmitted = true;

    const _payload: any = {
      username: this.userSignInForm.value.userAuth,
      password: this.userSignInForm.value.userPass
    }

    this._apiService.userSignIn(_payload).subscribe({
      next: (_res: any) => {
        console.log(_res);
        this._cookieService.setUserToken(_res.token);
        this.loadCrntUserInfo();
      },
      error: (_err: any) => {
        console.error("Error: ", _err);
        this.userSignInForm.get('userPass').setErrors({ badCredential: true });
        makeAllFormControlAsDirty(this.userSignInForm);
        this.validateUserForm();

        this.isFormSubmitted = false;
        this._sharedService.hideProgress();
      }
    });
  }

  loadCrntUserInfo = () => {
    this._apiService.getCrntUserInfo().subscribe({
      next: (_res: any) => {
        console.log("User Info: ", _res);
        this._cookieService.setUserInfo(_res);
        setTimeout(() => {
          this._sharedService.hideProgress();
          this.router.navigate(['/dashboard']);
        }, 500);
      },
      error: (_err: any) => {
        console.error("_err: ", _err);
        this._sharedService.hideProgress();
      }
    })
  }

}

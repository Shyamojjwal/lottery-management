import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app-core/services';
import { UserService } from '../../services';
import { NotifyService } from '@app-core/services/notify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app-core/authentication';
import { checkFormValidation, makeAllFormControlAsDirty, noWhitespaceValidator } from '@app-shared/helper/shared-functions';
import { appSettings } from '@app-core/config';
import { PasswordValidators } from '@app-shared/helper/password-validator';
import { modifyUserProValidationMsg } from '@app-shared/helper/validation-messages';
import { IUser } from '@app-shared/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public userForm: FormGroup | any;
  public isUserInfoEditable: boolean = false;
  public isUserFormSubmitted: boolean = false;
  public userInfoErrMsg: any = null;

  public passwordForm: FormGroup | any;
  public isPassFormSubmitted: boolean = false;
  public userPasswordErrMsg: any = null;

  public userCategoryList: Array<any> = ['Stockiest', 'SubStockiest', 'Seller'];

  private crntUserInfo: any = null;


  constructor(
    private FB: FormBuilder,
    private _notify: NotifyService,
    private _apiService: UserService,
    private _sharedService: SharedService,
    private _authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this._sharedService.showProgress();

    this.initAllForm();
    this.loadCrntUserInfo();
  }

  /*
    --------------------- Initiate User Profile & Change pssword form & form validation functionalities -------------
  */
  initAllForm = () => {
    this.userForm = this.FB.group({
      userCode: ["", [Validators.required]],
      username: ["", [Validators.required]],
      firstName: ["", [Validators.required, Validators.pattern(appSettings.RegExp.alphabet), noWhitespaceValidator]],
      lastName: ["", [Validators.required, Validators.pattern(appSettings.RegExp.alphabet), noWhitespaceValidator]],
      email: ["", [Validators.required, Validators.pattern(appSettings.RegExp.email), noWhitespaceValidator]],
      phoneNumber: ["", [Validators.required, Validators.pattern(appSettings.RegExp.phoneNo), noWhitespaceValidator]],
      address: ["", [Validators.required, Validators.pattern(appSettings.RegExp.address), noWhitespaceValidator]],
      userCategory: ["", [Validators.required]],
    });

    this.passwordForm = this.FB.group({
      username: [''],
      oldPassword: ['', [Validators.required, noWhitespaceValidator]],
      newPassword: ['', [Validators.required, noWhitespaceValidator]],
      cnfPassword: ['', [Validators.required]]
    },{
      validators: [PasswordValidators.MatchValidator('newPassword', 'cnfPassword')]
    });
  }

  trimAndValidateUserForm = (_field: string) => {
    this.userForm.get(_field).setValue(this.userForm.get(_field).value.trim());

    this.validateUserInfoForm();
  };

  trimAndValidateUserCrtForm = (_field: string) => {
    this.passwordForm.get(_field).setValue(this.passwordForm.get(_field).value.trim());

    this.validatePasswordForm();
  };

  validateUserInfoForm = () => {
    this.userInfoErrMsg = checkFormValidation(this.userForm, modifyUserProValidationMsg.userProfile);
  }

  validatePasswordForm = () => {
    this.userPasswordErrMsg = checkFormValidation(this.passwordForm, modifyUserProValidationMsg.userCredential);
  }


  /*
    --------------------- Load Crnt User Information -------------
  */
  loadCrntUserInfo = () => {
    this._apiService.getCrntUserInfo().subscribe({
      next: (_res: any) => {
        console.log("Load Crnt User Info: ", _res);

        this.crntUserInfo = { ..._res.data.user } as IUser

        this.userForm.patchValue({
          userCode: this.crntUserInfo.userCode,
          username: this.crntUserInfo.username,
          firstName: this.crntUserInfo.firstName,
          lastName: this.crntUserInfo.lastName,
          email: this.crntUserInfo.email,
          phoneNumber: this.crntUserInfo.phoneNumber,
          address: this.crntUserInfo.address
        })

        this.passwordForm.get("username").setValue(this.crntUserInfo.username);

        this._sharedService.hideProgress();

        console.log("loadCrntUserInfo: ", this.passwordForm.value);
      },
      error: (_err: any) => {
        console.error("Load Crnt User Info Err: ", _err);
        this._sharedService.hideProgress();
        this._notify.error("Unable to fetch the User information")
      }
    });
  }

  /*
    --------------------- Reset Form -------------
  */

    resetPasswordForm = () => {
      this.userPasswordErrMsg = null;
      this.passwordForm.reset();
    }

  /*
    --------------------- Calling Web Services for update user info & password -------------
  */

  modifyUserInformation = (_payload: any) => {
    this._sharedService.showProgress();

    if (!this.passwordForm.valid) {
      makeAllFormControlAsDirty(this.passwordForm);
      this.validatePasswordForm()
      this._sharedService.hideProgress();
      return;
    }

    this.isUserFormSubmitted = true;
    this._apiService.modifyUserInformation(this.userForm.value).subscribe({
      next: (_res: any) => {
        this._sharedService.hideProgress();
        this.loadCrntUserInfo();

        console.log("User Information: ", _res);
        this._notify.success("User Information has been changed successfully.")
        this.passwordForm.reset();
      },
      error: (_err: any) => {
        console.log("Password Changed Error: ", _err)
        this._sharedService.hideProgress();
        this._notify.error("Something Errors! Please check your inputs.")
      }
    });
  }

  modifyUserCredential = () => {
    this._sharedService.showProgress();

    if (!this.passwordForm.valid) {
      makeAllFormControlAsDirty(this.passwordForm);
      this.validatePasswordForm()
      this._sharedService.hideProgress();
      return;
    }

    this.isPassFormSubmitted = true;

    var _payload:any = {...this.passwordForm.value};
    delete _payload.cnfPassword;

    this._apiService.modifyUserCredential(_payload).subscribe({
      next: (_res: any) => {
        this._sharedService.hideProgress();
        console.log("Password Changed: ", _res);
        this._notify.success("Pasword has been changed successfully.")
        this.passwordForm.reset();
        this.isPassFormSubmitted = false;
      },
      error: (_err: any) => {
        console.log("Password Changed Error: ", _err)
        this._sharedService.hideProgress();
        this.isPassFormSubmitted = false;
        this.passwordForm.get('oldPassword').setErrors({wrongPass: true})
        this._notify.error("Something Errors! Please check your inputs.")
      }
    });
  }

}

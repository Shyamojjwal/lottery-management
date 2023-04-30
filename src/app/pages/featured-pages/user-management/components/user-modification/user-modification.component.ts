import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { checkFormValidation, generateRandCode, makeAllFormControlAsDirty, noWhitespaceValidator } from '@app-shared/helper/shared-functions';
import { appSettings } from "@app-core/config";
import { modifyUserValidationMsg } from '@app-shared/helper/validation-messages';
import { UserService } from '../../services';
import { IUser } from '@app-shared/models/user.model';
import { PasswordValidators } from '@app-shared/helper/password-validator';



@Component({
  selector: 'app-user-modification',
  templateUrl: './user-modification.component.html',
  styleUrls: ['./user-modification.component.scss']
})
export class UserModificationComponent implements OnInit {

  public isNewEntry: boolean = true;
  public isPreview: boolean = false;
  public isModify: boolean = false;
  public isInputReadOnly: boolean = true;

  public userModifyForm: FormGroup | any;
  public validationMessages: any = null;
  public isFormSubmitted: boolean = false;

  private userCode: any = null;
  private userInfo: IUser | any = null;
  public isValidatePass: boolean = false;

  public userCategoryList: Array<any> = ['Stockiest', 'SubStockiest', 'Seller'];

  constructor(
    private router: Router,
    private FB: FormBuilder,
    private apiService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isNewEntry = this.router.url.includes('new-user');
    this.userCode = this.activatedRoute.snapshot.params['userCode'] || null;

    this.initModifyForm();

    if (this.isNewEntry) {
      this.isPreview = false;
      this.isModify = true;
    } else {
      this.isPreview = true;
      this.isModify = false;
      this.loadUserInfo();
    }

    setTimeout(() => {
      this.isInputReadOnly = false;
    }, 1000)
  }

  initModifyForm = () => {
    this.userModifyForm = this.FB.group({
      userCode: ["", [Validators.required]],
      username: ["", [Validators.required]],
      firstName: ["", [Validators.required, Validators.pattern(appSettings.RegExp.alphabet), noWhitespaceValidator]],
      lastName: ["", [Validators.required, Validators.pattern(appSettings.RegExp.alphabet), noWhitespaceValidator]],
      email: ["", [Validators.required, Validators.pattern(appSettings.RegExp.email), noWhitespaceValidator]],
      phoneNumber: ["", [Validators.required, Validators.pattern(appSettings.RegExp.phoneNo), noWhitespaceValidator]],
      address: ["", [Validators.required, Validators.pattern(appSettings.RegExp.address), noWhitespaceValidator]],
      userCategory: ["", [Validators.required]],
      password: [""],
      cnfPass: [""],
    }, {
      validator: PasswordValidators.MatchValidator(
        'password',
        'cnfPass'
      )
    })
    this.passwordValidationSetup()

    this.userModifyForm.get('userCode').valueChanges.subscribe(() => {
      this.validateUserForm();
    })
  }

  passwordValidationSetup = () => {
    if (this.isValidatePass || this.isNewEntry) {
      this.userModifyForm.get('password').setValidators([Validators.required, noWhitespaceValidator]);
      this.userModifyForm.get('cnfPass').setValidators([Validators.required]);
    } else {
      this.userModifyForm.get('password').clearValidators();
      this.userModifyForm.get('cnfPass').clearValidators();
    }
  }

  loadUserInfo = () => {
    this.apiService.loadAllUserInfo(this.userCode).subscribe({
      next: (_res: any) => {
        console.log("User Response: ", _res);
        this.userInfo = { ..._res.data.user } as IUser

        this.userModifyForm.patchValue({
          userCode: this.userInfo.userCode,
          username: this.userInfo.username,
          firstName: this.userInfo.firstName,
          lastName: this.userInfo.lastName,
          email: this.userInfo.email,
          phoneNumber: this.userInfo.phoneNumber,
          address: this.userInfo.address
        })
      },
      error: (_err: any) => {
        console.error("Error: ", _err);
      }
    })
  }

  generateUserCode = () => {
    const _userCode = generateRandCode();
    this.userModifyForm.patchValue({
      userCode: _userCode
    })
  }

  continueInfoModification = () => {
    this.isPreview = false;
    this.isModify = true;
  }

  trimAndValidateUserForm = (_field: string) => {
    this.userModifyForm.get(_field).setValue(this.userModifyForm.get(_field).value.trim());

    this.validateUserForm();
  };


  validateUserForm = () => {
    this.validationMessages = checkFormValidation(this.userModifyForm, modifyUserValidationMsg);
    // console.log("validationMessages: ", this.validationMessages, this.userModifyForm.value)
  };

  saveModificationForm = () => {
    if (!this.userModifyForm.valid) {
      makeAllFormControlAsDirty(this.userModifyForm);
      this.validateUserForm();
      this.isFormSubmitted = false;
      return;
    }
    this.isFormSubmitted = true;
    var _payload: any = { ...this.userModifyForm.value };
    if (!this.isNewEntry) {
      _payload.userCode = this.userCode;
      delete _payload.password;
    }

    delete _payload.cnfPass;

    // console.log("Payload: ", _payload, this.userModifyForm.value);
    // return;

    this.apiService.submitModifyForm(_payload, this.isNewEntry).subscribe({
      next: (_res: any) => {
        console.error("Modify User Success: ", _res);
        this.router.navigate(['/user-management']);
      },
      error: (_err: any) => {
        console.error("Modify User Error: ", _err);
        this.isFormSubmitted = false;
      }
    })
  }

}

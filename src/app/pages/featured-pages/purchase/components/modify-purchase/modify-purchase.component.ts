import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../../services';
import { checkFormValidation, makeAllFormArrayControlAsDirty, makeAllFormControlAsDirty } from '@app-shared/helper/shared-functions';
import { purchaseValidationMsg } from '@app-shared/helper/validation-messages';

import { faTrashAlt, faPlusCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Observable, forkJoin } from 'rxjs';
import { RaffleService } from '@app-modules/featured-pages/raffle-management/services';
import { GroupService } from '@app-modules/featured-pages/group-management/services';
import { UserService } from '@app-modules/featured-pages/user-management/services';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { AuthenticationService } from '@app-core/authentication';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-modify-purchase',
  templateUrl: './modify-purchase.component.html',
  styleUrls: ['./modify-purchase.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ModifyPurchaseComponent implements OnInit {

  public iconTrash: any = faTrashAlt;
  public iconAdd: any = faPlusCircle;
  public iconExclamation: any = faExclamationCircle;

  private crntUserInfo: any = null;

  public isNewEntry: boolean = true;
  public isPreview: boolean = false;
  public isModify: boolean = false;
  public isInputReadOnly: boolean = true;

  public itemModifyForm: FormGroup | any;
  public validationMessages: any = {
    prch: null,
    prchDtlsLst: []
  };
  public isFormSubmitted: boolean = false;

  private itemId: any = null;
  private itemInfo: any = null;

  public playTime: any = null;
  public _drawTime: any = null;

  public usersListArray: Array<any> = [];

  public raffleListArray: Array<any> = [];

  public grpListArray: Array<any> = [];

  constructor(
    private router: Router,
    private FB: FormBuilder,
    private _apiService: PurchaseService,
    private _raffleService: RaffleService,
    private _grpService: GroupService,
    private _userService: UserService,
    private _authService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.crntUserInfo = this._authService.getUser();
    console.log("crntUserInfo: ", this.crntUserInfo)
    this.isNewEntry = this.router.url.includes('new-purchase');
    this.itemId = this.activatedRoute.snapshot.params['itemId'] || null;

    this.initModifyForm();

    if (this.isNewEntry) {
      this.isPreview = false;
      this.isModify = true;
    } else {
      this.isPreview = true;
      this.isModify = false;
      this.loadItemInfo();
    }

    this.loadDependencyList();

    setTimeout(() => {
      this.isInputReadOnly = false;
    }, 1000);
  }

  getDependencyList = (): Observable<any> => {
    const _custApi = this._userService.loadAllUsers();
    const _raffleApi = this._raffleService.loadAllItems();
    const _grpApi = this._grpService.loadAllGroups();
    return forkJoin([_custApi, _raffleApi, _grpApi]);
  }

  loadDependencyList = () => {
    this.getDependencyList().subscribe({
      next: ([_users, _raffle, _grp]) => {
        console.group("loadDependencyList Response")
        console.log("Users Res: ", _users);
        console.log("Raffle Res: ", _raffle);
        console.log("Group Res: ", _grp);
        console.groupEnd();
        this.usersListArray = [...(_raffle?.data?.user || [])];

        this.raffleListArray = [...(_raffle?.data?.raffles || [])];

        this.grpListArray = [...(_grp?.data?.groups || [])];
      },
      error: ([_usersErr, _raffelErr, _grpErr]) => {
        console.group("loadDependencyList Error")
        console.error("User Error: ", _usersErr);
        console.error("Raffle Error: ", _raffelErr);
        console.error("Group Error: ", _grpErr);
        console.groupEnd();
      }
    })
  }

  loadItemInfo = () => {
    this._apiService.getItemInfo(this.itemId).subscribe({
      next: (_res: any) => {
        console.log("Item Info: ", _res);
      },
      error: (_err: any) => {
        console.log("Item Info Error: ", _err);
      }
    })
  }

  initModifyForm = () => {
    const _this = this;
    this.itemModifyForm = this.FB.group({
      prch: _this.FB.group({
        memoNo: ['', [Validators.required]],
        userId: [_this.crntUserInfo.id, [Validators.required]],
        prchDt: ['', [Validators.required]],
      }),
      prchDtlsLst: _this.FB.array([])
    });
    this.addNewItem();
  }

  get prch() {
    return this.itemModifyForm.get('prch') as FormGroup;
  }

  get prchDtlsLst() {
    return this.itemModifyForm.get('prchDtlsLst') as FormArray;
  }

  prchDtlsForm = (_index: any) => {
    return this.prchDtlsLst.controls[_index] as FormGroup;
  }

  addNewItemToList = () => {
    const _singleItemForm = this.FB.group({
      raffleId: ['', [Validators.required]],
      draw: ['', [Validators.required]],
      drawDate: ['', [Validators.required]],
      rflStrFrom: ['', [Validators.required]],
      rflEndTo: ['', [Validators.required]],
      grpId: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      rate: ['', [Validators.required]]
    })

    this.prchDtlsLst.push(_singleItemForm);
  }

  addNewItem = () => {
    this.addNewItemToList();
  }

  removeItem = (_itemIndex: number) => {
    this.prchDtlsLst.removeAt(_itemIndex);
  }

  trimAndValidateItemForm = (_field: string, _fieldType: string, _arrayIndex: any = null) => {
    if (_fieldType == 'objInput') {
      var _filedValue = this.prch.get(_field)?.value || '';
      if (_filedValue != undefined && _filedValue != null && typeof _filedValue == 'string') {
        this.prch.get(_field)?.setValue(_filedValue.trim());
      }
    } else {
      var _filedValue = this.prchDtlsLst.controls[_arrayIndex].get(_field)?.value || '';
      if (_filedValue != undefined && _filedValue != null && typeof _filedValue == 'string') {
        this.prchDtlsLst.controls[_arrayIndex].get(_field)?.setValue(_filedValue.trim());
      }
    }
    this.validateItemForm(_arrayIndex);
  }

  validateItemForm = (_arrayIndex: any = null) => {
    var _prchError: any = checkFormValidation(this.prch, purchaseValidationMsg.prch);
    var _prchListErr: Array<any> = [];

    if (_arrayIndex != null) {
      const _listErr = checkFormValidation(this.prchDtlsForm(_arrayIndex), purchaseValidationMsg.prchDtlsLst);
      _prchListErr.push(_listErr);
    } else {
      for (const [_index, _form] of this.prchDtlsLst.controls.entries()) {
        const _listErr = checkFormValidation(this.prchDtlsForm(_index), purchaseValidationMsg.prchDtlsLst);
        _prchListErr.push(_listErr);
      }
    }

    this.validationMessages.prch = {..._prchError};
    this.validationMessages.prchDtlsLst = [..._prchListErr];
    console.log("validateItemForm: ", this.validationMessages);
  };

  populateOtherRaffleInfo = (_arrayIndex: number) => {
    const _selectedObj = this.prchDtlsLst.controls[_arrayIndex];
    const _selectedRaffleId = _selectedObj.value.raffleId;
    const _raffleInfo = this.raffleListArray.find((x: any) => x.id == parseInt(_selectedRaffleId));

    if (_raffleInfo != undefined) {
      this.prchDtlsLst.controls[_arrayIndex].patchValue({
        drawDate: new Date(_raffleInfo.playDay)
      })
    }
  }

  continueInfoModification = () => {
    this.isPreview = false;
    this.isModify = true;
  }

  saveModificationForm = () => {
    console.log("saveModificationForm: ", this.prch, this.prchDtlsLst);
    // return;
    if (!this.itemModifyForm.valid) {
      makeAllFormControlAsDirty(this.prch);
      makeAllFormArrayControlAsDirty(this.prchDtlsLst);
      this.validateItemForm();
      this.isFormSubmitted = false;
      return;
    }

    console.log("Payload: ", this.itemModifyForm.value);
    // return;

    const _payload = { ...this.itemModifyForm.value };

    this._apiService.modifyItemInfo(_payload, this.isNewEntry).subscribe({
      next: (_res: any) => {
        console.error("Modify Raffle Success: ", _res);
        this.router.navigate(['/raffle-management']);
      },
      error: (_err: any) => {
        console.error("Modify Raffle Error: ", _err);
        this.isFormSubmitted = false;
      }
    })
  }

}

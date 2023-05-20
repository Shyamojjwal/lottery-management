import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faExclamationCircle, faPlusCircle, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { RaffleService } from '@app-modules/featured-pages/raffle-management/services';
import { GroupService } from '@app-modules/featured-pages/group-management/services';
import { UserService } from '@app-modules/featured-pages/user-management/services';
import { AuthenticationService } from '@app-core/authentication';
import * as moment from 'moment';
import { checkFormValidation, makeAllFormArrayControlAsDirty, makeAllFormControlAsDirty } from '@app-shared/helper/shared-functions';
import { Observable, forkJoin } from 'rxjs';
import { itemObjectArrayFieldValidationMsg } from '@app-shared/helper/validation-messages';
import { AdvanceReturnService } from '../../services';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { SharedService } from '@app-core/services';
import { NotifyService } from '@app-core/services/notify.service';

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
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.scss'],
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
export class ModificationComponent implements OnInit {

  public iconTrash: any = faTrashAlt;
  public iconAdd: any = faPlusCircle;
  public iconSearch: any = faSearch;
  public iconExclamation: any = faExclamationCircle;

  private crntUserInfo: any = null;

  public isNewEntry: boolean = true;
  public isPreview: boolean = false;
  public isModify: boolean = false;
  public isInputReadOnly: boolean = true;

  public itemModifyForm: FormGroup | any;
  public validationMessages: any = {
    objFieldErr: null,
    arrFieldErr: []
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
    private _grpService: GroupService,
    private _userService: UserService,
    private _raffleService: RaffleService,
    private _sharedService: SharedService,
    private _notifyService: NotifyService,
    private activatedRoute: ActivatedRoute,
    private _apiService: AdvanceReturnService,
    private _authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this._sharedService.showProgress();

    this.crntUserInfo = this._authService.getUser();

    this.isNewEntry = this.router.url.includes('advance-return-management');
    // this.isNewEntry = this.router.url.includes('new-dispatch');
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

  /*
    ---------------------------------------------------------------------
    =========== Item Modification Functionality =======================
    ---------------------------------------------------------------------
  */

  continueInfoModification = () => {
    this.isPreview = false;
    this.isModify = true;
  }

  /*
    ------------------------------------------------------------
    =========== Load Form Dependencies =======================
    ------------------------------------------------------------
  */

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
        this.usersListArray = [...(_users?.data?.user?.map((_u: any) => {
          var _name: string = '';

          if (_u?.firstName?.trim().length > 0) {
            _name += _u?.firstName?.trim();
          }

          if (_u?.lastName?.trim().length > 0) {
            if(_name.trim().length > 0){
              _name += " " + _u?.lastName?.trim();
            } else {
              _name += _u?.lastName?.trim();
            }
          }
          _u.fullName = _name;
          return _u;
        }) || [])];

        this.raffleListArray = [...(_raffle?.data?.raffles || [])];

        this.grpListArray = [...(_grp?.data?.groups || [])];
        this._sharedService.hideProgress();
      },
      error: ([_usersErr, _raffelErr, _grpErr]) => {
        console.group("loadDependencyList Error")
        console.error("User Error: ", _usersErr);
        console.error("Raffle Error: ", _raffelErr);
        console.error("Group Error: ", _grpErr);
        console.groupEnd();
        this._sharedService.hideProgress();
      }
    })
  }

  /*
    ----------------------------------------------------
    =========== Load Item Info =======================
    ----------------------------------------------------
  */

  loadItemInfo = () => {
    // this._apiService.getItemInfo(this.itemId).subscribe({
    //   next: (_res: any) => {
    //     console.log("Item Info: ", _res);
    //   },
    //   error: (_err: any) => {
    //     console.log("Item Info Error: ", _err);
    //   }
    // })
  }

  searchItemMemo = () => {
    // const _date: string = this.advanceReturn.value.advReturnDate;

    // console.log("searchItemMemo: ", _advReturnDate);

    // if(_advReturnDate && _date != undefined && _date != '') {
    //   this._apiService.getItemInfoByDate(_date).subscribe({
    //     next: (_res:any) => {
    //       console.log("searchItemMemo: ", _res);
    //     },
    //     error: (_err:any) => {
    //       console.error("SearchItemMemo Err: ", _err)
    //     }
    //   })
    // }
  }

  /*
    ----------------------------------------------------------------------
    =========== Initiate Form & it's form fields =======================
    ----------------------------------------------------------------------
  */

  initModifyForm = () => {
    const _this = this;
    this.itemModifyForm = this.FB.group({
      advanceReturn: _this.FB.group({
        memoNo: ['', [Validators.required]],
        userId: ['', [Validators.required]],
        advReturnDate: ['', [Validators.required]],
      }),
      advanceReturnDetailsList: _this.FB.array([])
    });
    this.addNewItem();
  }

  get advanceReturn() {
    return this.itemModifyForm.get('advanceReturn') as FormGroup;
  }

  get advanceReturnDetailsList() {
    return this.itemModifyForm.get('advanceReturnDetailsList') as FormArray;
  }

  advanceReturnDtlsForm = (_index: any) => {
    return this.advanceReturnDetailsList.controls[_index] as FormGroup;
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

    this.advanceReturnDetailsList.push(_singleItemForm);
  }

  /*
    --------------------------------------------------------------------------------
    =========== Add new array Item or Remove existing Item =======================
    --------------------------------------------------------------------------------
  */

  addNewItem = () => {
    makeAllFormArrayControlAsDirty(this.advanceReturnDetailsList);
    this.validateItemForm();

    if (this.advanceReturnDetailsList.valid) {
      this.addNewItemToList();
    }
  }

  removeItem = (_itemIndex: number) => {
    this.advanceReturnDetailsList.removeAt(_itemIndex);
  }

  /*
    -----------------------------------------------------------------
      =========== Filtering Number Input Only =======================
    -----------------------------------------------------------------
  */

  inputOnlyInt = (_inputEvent: Event | any, _field: string, _isArrayInput: boolean = false, _arrayIndex: number = 0) => {
    setTimeout(() => {
      var _val = (_inputEvent.target.value).match(/\d/g)?.join('') || '';
      if (_isArrayInput) {
        this.advanceReturnDtlsForm(_arrayIndex).get(_field)?.setValue(_val);
      } else {
        this.advanceReturn.get(_field)?.setValue(_val);
      }
    }, 1000);
  }

  /*
    ------------------------------------------------------------------
    =========== All Validation functionality =======================
    ------------------------------------------------------------------
  */

  validateObjectFieldOnBlur = (_field: string) => {
    var _fieldValue = this.advanceReturn.get(_field)?.value;

    if (typeof _fieldValue !== 'object' && !Array.isArray(_fieldValue)) {
      _fieldValue = (this.advanceReturn.get(_field)?.value).toString().trim() || '';
      this.advanceReturn.get(_field)?.setValue(_fieldValue.trim());
    }

    this.advanceReturn.get(_field)?.markAsDirty();
    this.validateItemForm();
  }

  validateArrayFieldOnBlur = (_arrayIndex: number, _field: string) => {
    var _fieldValue = this.advanceReturnDtlsForm(_arrayIndex).get(_field)?.value;

    if (typeof _fieldValue !== 'object' && !Array.isArray(_fieldValue)) {
      _fieldValue = _fieldValue.toString().trim() || '';
      this.advanceReturnDtlsForm(_arrayIndex).get(_field)?.setValue(_fieldValue);
    }
    this.advanceReturnDtlsForm(_arrayIndex).get(_field)?.markAsDirty();
    this.validateItemForm();
  }

  validateItemForm = () => {
    var _advanceReturnError: any = checkFormValidation(this.advanceReturn, itemObjectArrayFieldValidationMsg.objFieldMsg);
    var _advanceReturnListErr: Array<any> = [];

    for (const [_index, _form] of this.advanceReturnDetailsList.controls.entries()) {
      const _listErr = checkFormValidation(this.advanceReturnDtlsForm(_index), itemObjectArrayFieldValidationMsg.arrayFieldMsg);
      _advanceReturnListErr.push(_listErr);
    }

    this.validationMessages.objFieldErr = { ..._advanceReturnError };
    this.validationMessages.arrFieldErr = [..._advanceReturnListErr];
  };

  /*
    ---------------------------------------------------------------------------
    =========== Populating Item values on other field =======================
    ---------------------------------------------------------------------------
  */

  populateOtherRaffleInfo = (_arrayIndex: number) => {
    const _selectedObj = this.advanceReturnDetailsList.controls[_arrayIndex];
    const _selectedRaffleId = _selectedObj.value.raffleId;
    const _raffleInfo = this.raffleListArray.find((x: any) => x.id == parseInt(_selectedRaffleId));

    if (_raffleInfo != undefined && moment(_raffleInfo.playDay, "YYYY-MM-DD").isValid()) {
      this.advanceReturnDetailsList.controls[_arrayIndex].patchValue({
        drawDate: new Date(_raffleInfo.playDay)
      })
    }
  }

  /*
    ------------------------------------------------------------
    =========== Save Modification From =======================
    ------------------------------------------------------------
  */

  saveModificationForm = () => {
    this._sharedService.showProgress();

    if (!this.itemModifyForm.valid) {
      makeAllFormControlAsDirty(this.advanceReturn);
      makeAllFormArrayControlAsDirty(this.advanceReturnDetailsList);
      this.validateItemForm();
      this._sharedService.hideProgress();
      return;
    }

    this.isFormSubmitted = true;

    const _payload = { ...this.itemModifyForm.value };

    _payload.advanceReturn.memoNo = parseInt(_payload.advanceReturn.memoNo);
    _payload.advanceReturn.userId = parseInt(_payload.advanceReturn.userId);
    _payload.advanceReturn.advReturnDate = moment(_payload.advanceReturn.advReturnDate).format("YYYY-MM-DD");
    _payload.advanceReturnDetailsList = _payload.advanceReturnDetailsList.map((_x: any) => {
      _x.qty = parseInt(_x.qty);
      _x.rate = parseInt(_x.rate);
      _x.draw = parseInt(_x.draw);
      _x.grpId = parseInt(_x.grpId);
      _x.rflEndTo = parseInt(_x.rflEndTo);
      _x.raffleId = parseInt(_x.raffleId);
      _x.rflStrFrom = parseInt(_x.rflStrFrom);
      _x.drawDate = moment(_x.drawDate).format("YYYY-MM-DD");
      return _x;
    })

    this._apiService.modifyItemInfo(this.crntUserInfo.id, _payload, this.isNewEntry).subscribe({
      next: (_res: any) => {
        console.log("Advance Return Success: ", _res);
        this._notifyService.success('Advance Return Information has been submitted successfully.');
        this.resetForm();
        this._sharedService.hideProgress();
      },
      error: (_err: any) => {
        console.error("Advance Return Error: ", _err);
        this.isFormSubmitted = false;
        this._sharedService.hideProgress();
      }
    })
  }

  resetForm = () => {
    // do your functionality
    this.validationMessages = {
      objFieldErr: null,
      arrFieldErr: []
    };

    this.advanceReturn.reset();
    this.itemModifyForm.controls.advanceReturnDetailsList = this.FB.array([]);

    this.addNewItem();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faExclamationCircle, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DispatchService } from '../../services';
import { RaffleService } from '@app-modules/featured-pages/raffle-management/services';
import { GroupService } from '@app-modules/featured-pages/group-management/services';
import { UserService } from '@app-modules/featured-pages/user-management/services';
import { AuthenticationService } from '@app-core/authentication';
import * as moment from 'moment';
import { checkFormValidation, makeAllFormArrayControlAsDirty, makeAllFormControlAsDirty } from '@app-shared/helper/shared-functions';
import { Observable, forkJoin } from 'rxjs';
import { dispatchValidationMsg } from '@app-shared/helper/validation-messages';

@Component({
  selector: 'app-modify-dispatch',
  templateUrl: './modify-dispatch.component.html',
  styleUrls: ['./modify-dispatch.component.scss']
})
export class ModifyDispatchComponent implements OnInit {

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
    dsph: null,
    dsphDtlsLst: []
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
    private _apiService: DispatchService,
    private _raffleService: RaffleService,
    private _grpService: GroupService,
    private _userService: UserService,
    private _authService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.crntUserInfo = this._authService.getUser();
    
    this.isNewEntry = this.router.url.includes('new-dispatch');
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

  /*
    ----------------------------------------------------
    =========== Load Item Info =======================
    ----------------------------------------------------
  */

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

  /*
    ----------------------------------------------------------------------
    =========== Initiate Form & it's form fields =======================
    ----------------------------------------------------------------------
  */

  initModifyForm = () => {
    const _this = this;
    this.itemModifyForm = this.FB.group({
      dsph: _this.FB.group({
        memoNo: ['', [Validators.required]],
        userId: [_this.crntUserInfo.id, [Validators.required]],
        dsphDt: ['', [Validators.required]],
      }),
      dsphDtlsLst: _this.FB.array([])
    });
    this.addNewItem();
  }

  get dsph() {
    return this.itemModifyForm.get('dsph') as FormGroup;
  }

  get dsphDtlsLst() {
    return this.itemModifyForm.get('dsphDtlsLst') as FormArray;
  }

  dsphDtlsForm = (_index: any) => {
    return this.dsphDtlsLst.controls[_index] as FormGroup;
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

    this.dsphDtlsLst.push(_singleItemForm);
  }

  /*
    --------------------------------------------------------------------------------
    =========== Add new array Item or Remove existing Item =======================
    --------------------------------------------------------------------------------
  */

  addNewItem = () => {
    makeAllFormArrayControlAsDirty(this.dsphDtlsLst);
    this.validateItemForm();

    if (this.dsphDtlsLst.valid) {
      this.addNewItemToList();
    }
  }

  removeItem = (_itemIndex: number) => {
    this.dsphDtlsLst.removeAt(_itemIndex);
    makeAllFormArrayControlAsDirty(this.dsphDtlsLst);
    this.validateItemForm();
  }

  /*
    -----------------------------------------------------------------
      =========== Filtering Number Input Only =======================
    -----------------------------------------------------------------
  */

  inputOnlyInt = (_inputEvent: Event | any, _field: string, _isArrayInput: boolean = false, _arrayIndex: number = 0) => {
    setTimeout(() => {
      var _val = (_inputEvent.target.value).match(/\d/g)?.join('') || '';
      if(_isArrayInput) {
        this.dsphDtlsForm(_arrayIndex).get(_field)?.setValue(_val);
      } else {
        this.dsph.get(_field)?.setValue(_val);
      }
    }, 1000);
  }

  /*
    ------------------------------------------------------------------
    =========== All Validation functionality =======================
    ------------------------------------------------------------------
  */

  validateObjectFieldOnBlur = (_field: string) => {
    var _fieldValue = this.dsph.get(_field)?.value;

    if (typeof _fieldValue !== 'object' && !Array.isArray(_fieldValue)) {
      _fieldValue = (this.dsph.get(_field)?.value).toString().trim() || '';
      this.dsph.get(_field)?.setValue(_fieldValue.trim());
    }

    this.dsph.get(_field)?.markAsDirty();
    this.validateItemForm();
  }

  validateArrayFieldOnBlur = (_arrayIndex: number, _field: string) => {
    var _fieldValue = this.dsphDtlsForm(_arrayIndex).get(_field)?.value;

    if (typeof _fieldValue !== 'object' && !Array.isArray(_fieldValue)) {
      _fieldValue = _fieldValue.toString().trim() || '';
      this.dsphDtlsForm(_arrayIndex).get(_field)?.setValue(_fieldValue);
    }
    this.dsphDtlsForm(_arrayIndex).get(_field)?.markAsDirty();
    this.validateItemForm();
  }

  validateItemForm = () => {
    var _dsphError: any = checkFormValidation(this.dsph, dispatchValidationMsg.dsph);
    var _dsphListErr: Array<any> = [];

    for (const [_index, _form] of this.dsphDtlsLst.controls.entries()) {
      const _listErr = checkFormValidation(this.dsphDtlsForm(_index), dispatchValidationMsg.dsphDtlsLst);
      _dsphListErr.push(_listErr);
    }

    this.validationMessages.dsph = { ..._dsphError };
    this.validationMessages.dsphDtlsLst = [..._dsphListErr];
  };

  /*
    ---------------------------------------------------------------------------
    =========== Populating Item values on other field =======================
    ---------------------------------------------------------------------------
  */

  datePickerDateChange = (_event: any, _field: string, _fieldType: string = 'objectField', _arrayIndex: number = 0) => {
    console.log("datePickerDateChange: ", _event, _field, _fieldType, _arrayIndex);
    // if(_fieldType === 'objectField') {
    // this.dsph.get(_field)?.setValue()
    // }
  }

  populateOtherRaffleInfo = (_arrayIndex: number) => {
    const _selectedObj = this.dsphDtlsLst.controls[_arrayIndex];
    const _selectedRaffleId = _selectedObj.value.raffleId;
    const _raffleInfo = this.raffleListArray.find((x: any) => x.id == parseInt(_selectedRaffleId));

    if (_raffleInfo != undefined && moment(_raffleInfo.playDay, "YYYY-MM-DD").isValid()) {
      this.dsphDtlsLst.controls[_arrayIndex].patchValue({
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
    if (!this.itemModifyForm.valid) {
      makeAllFormControlAsDirty(this.dsph);
      makeAllFormArrayControlAsDirty(this.dsphDtlsLst);
      this.validateItemForm();
      this.isFormSubmitted = false;
      return;
    }

    const _payload = { ...this.itemModifyForm.value };

    _payload.dsph.memoNo = parseInt(_payload.dsph.memoNo);
    _payload.dsph.dsphDt = moment(_payload.dsph.dsphDt).format("YYYY-MM-DD");
    _payload.dsphDtlsLst = _payload.dsphDtlsLst.map((_x: any) => {
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

    this._apiService.modifyItemInfo(_payload, this.isNewEntry).subscribe({
      next: (_res: any) => {
        console.log("Modify Raffle Success: ", _res);
        this.router.navigate(['/dispatch-management']);
      },
      error: (_err: any) => {
        console.error("Modify Raffle Error: ", _err);
        this.isFormSubmitted = false;
      }
    })
  }

}

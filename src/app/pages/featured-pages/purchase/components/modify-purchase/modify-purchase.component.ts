import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../../services';
import { checkFormValidation, makeAllFormControlAsDirty } from '@app-shared/helper/shared-functions';
import { modifyPurchaseValidationMsg } from '@app-shared/helper/validation-messages';

import { faTrashAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
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

  private crntUserInfo: any = null;

  public isNewEntry: boolean = true;
  public isPreview: boolean = false;
  public isModify: boolean = false;
  public isInputReadOnly: boolean = true;

  public itemModifyForm: FormGroup | any;
  public validationMessages: any = null;
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

  get prchDtlsLst() {
    return this.itemModifyForm.controls['prchDtlsLst'] as FormArray;
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

  populateOtherRaffleInfo = (_arrayIndex: number) => {
    const _selectedObj = this.prchDtlsLst.controls[_arrayIndex];
    const _selectedRaffleId = _selectedObj.value.raffleId;
    const _raffleInfo = this.raffleListArray.find((x:any) => x.id == parseInt(_selectedRaffleId));

    if(_raffleInfo != undefined) {
      this.prchDtlsLst.controls[_arrayIndex].patchValue({
        drawDate: new Date(_raffleInfo.playDay)
      })
    }
    console.log("populateOtherRaffleInfo: ", _selectedObj)
  }

  trimAndValidateUserForm = (_field: string) => {
    const _filedValue = this.itemModifyForm.get(_field).value;
    if (_filedValue != undefined && _filedValue != null && typeof _filedValue == 'string') {
      this.itemModifyForm.get(_field).setValue(_filedValue.trim());
    }

    this.validateUserForm();
  };

  validateUserForm = () => {
    this.validationMessages = checkFormValidation(this.itemModifyForm, modifyPurchaseValidationMsg);
  };

  continueInfoModification = () => {
    this.isPreview = false;
    this.isModify = true;
  }

  saveModificationForm = () => {
    if (!this.itemModifyForm.valid) {
      makeAllFormControlAsDirty(this.itemModifyForm);
      this.validateUserForm();
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

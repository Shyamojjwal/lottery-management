import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService, NotifyService } from '@app-core/services';
import { SchemeService } from '@app-featured-modules/scheme-management/services';
import { RaffleService } from '@app-modules/featured-pages/raffle-management/services';
import { checkFormValidation, makeAllFormArrayControlAsDirty, makeAllFormControlAsDirty, noWhitespaceValidator } from '@app-shared/helper/shared-functions';
import { itemObjectArrayFieldValidationMsg } from '@app-shared/helper/validation-messages';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle, faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

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

  public isNewEntry: boolean = true;
  public isPreview: boolean = false;
  public isModify: boolean = false;
  public isInputReadOnly: boolean = true;

  public itemModifyForm: FormGroup | any;
  public validationMessages: any = {
    scheme: null,
    schemeDetailsList: []
  };
  public isFormSubmitted: boolean = false;

  private itemId: any = null;
  private itemInfo: any = null;

  public raffleListArray: Array<any> = [];

  constructor(
    private router: Router,
    private FB: FormBuilder,
    private _apiService: SchemeService,
    private _raffleService: RaffleService,
    private _sharedService: SharedService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._sharedService.showProgress();

    this.isNewEntry = this.router.url.includes('scheme-management');
    // this.isNewEntry = this.router.url.includes('new-scheme');
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
  loadDependencyList = () => {
    this._raffleService.loadAllItems().subscribe({
      next: (_raffleRes: any) => {
        console.group("loadDependencyList Response");
        console.log("Raffle Res: ", _raffleRes);
        console.groupEnd();

        this.raffleListArray = [...(_raffleRes?.data?.raffles || [])];

        this._sharedService.hideProgress();
      },
      error: (_raffelErr) => {
        console.group("loadDependencyList Error");
        console.error("Raffle Error: ", _raffelErr);
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
      scheme: _this.FB.group({
        schemeId: [''],
        schemeName: ['', [Validators.required, noWhitespaceValidator]],
        drwFrm: ['', [Validators.required]],
        drwTo: ['', [Validators.required]],
        series: ['', [Validators.required]],
        state: ['', [Validators.required]],
        dop: ['', [Validators.required]],
      }),
      schemeDetailsList: _this.FB.array([])
    });
    this.addNewItem();
  }

  get scheme() {
    return this.itemModifyForm.get('scheme') as FormGroup;
  }

  get schemeDetailsList() {
    return this.itemModifyForm.get('schemeDetailsList') as FormArray;
  }

  schemeDetailsListForm = (_index: any) => {
    return this.schemeDetailsList.controls[_index] as FormGroup;
  }

  addNewItemToList = () => {
    const _singleItemForm = this.FB.group({
      schemeDtlsId: [''],
      raffleId: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      pfx: ['', [Validators.required]],
      srs: ['', [Validators.required]],
      numberOfPrize: ['', [Validators.required]],
      przAmount: ['', [Validators.required]],
      supTkt: ['', [Validators.required]],
      splTkt: ['', [Validators.required]],
      stkBon: ['', [Validators.required]],
      tprz: ['', [Validators.required]],
      nod: ['', [Validators.required]]
    })

    this.schemeDetailsList.push(_singleItemForm);
  }

  /*
    --------------------------------------------------------------------------------
    =========== Add new array Item or Remove existing Item =======================
    --------------------------------------------------------------------------------
  */

  addNewItem = () => {
    makeAllFormArrayControlAsDirty(this.schemeDetailsList);
    this.validateItemForm();

    if (this.schemeDetailsList.valid) {
      this.addNewItemToList();
    }
  }

  removeItem = (_itemIndex: number) => {
    this.schemeDetailsList.removeAt(_itemIndex);
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
        this.schemeDetailsListForm(_arrayIndex).get(_field)?.setValue(_val);
      } else {
        this.scheme.get(_field)?.setValue(_val);
      }
    }, 1000);
  }

  /*
    ------------------------------------------------------------------
    =========== All Validation functionality =======================
    ------------------------------------------------------------------
  */

  validateObjectFieldOnBlur = (_field: string) => {
    var _fieldValue = this.scheme.get(_field)?.value;

    if (typeof _fieldValue !== 'object' && !Array.isArray(_fieldValue)) {
      _fieldValue = (this.scheme.get(_field)?.value).toString().trim() || '';
      this.scheme.get(_field)?.setValue(_fieldValue.trim());
    }

    this.scheme.get(_field)?.markAsDirty();
    this.validateItemForm();
  }

  validateArrayFieldOnBlur = (_arrayIndex: number, _field: string) => {
    var _fieldValue = this.schemeDetailsListForm(_arrayIndex).get(_field)?.value;

    if (typeof _fieldValue !== 'object' && !Array.isArray(_fieldValue)) {
      _fieldValue = _fieldValue.toString().trim() || '';
      this.schemeDetailsListForm(_arrayIndex).get(_field)?.setValue(_fieldValue);
    }
    this.schemeDetailsListForm(_arrayIndex).get(_field)?.markAsDirty();
    this.validateItemForm();
  }

  validateItemForm = () => {
    var _objError: any = checkFormValidation(this.scheme, itemObjectArrayFieldValidationMsg.objFieldMsg);
    var _listErr: Array<any> = [];

    for (const [_index, _form] of this.schemeDetailsList.controls.entries()) {
      const _errlistArr = checkFormValidation(this.schemeDetailsListForm(_index), itemObjectArrayFieldValidationMsg.arrayFieldMsg);
      _listErr.push(_errlistArr);
    }

    this.validationMessages.scheme = { ..._objError };
    this.validationMessages.schemeDetailsList = [..._listErr];
  };

  /*
    ------------------------------------------------------------
    =========== Save Modification From =======================
    ------------------------------------------------------------
  */

  saveModificationForm = () => {
    const _this = this;
    this._sharedService.showProgress();

    if (!this.itemModifyForm.valid) {
      makeAllFormControlAsDirty(this.scheme);
      makeAllFormArrayControlAsDirty(this.schemeDetailsList);
      this.validateItemForm();
      this.isFormSubmitted = false;
      this._sharedService.hideProgress();
      return;
    }

    this.isFormSubmitted = true;

    const _payload = { ...this.itemModifyForm.value };

    if(this.isNewEntry) {
      delete _payload.scheme.schemeId;
    }

    _payload.scheme.drwFrm = parseInt(_payload.scheme.drwFrm);
    _payload.scheme.drwTo = parseInt(_payload.scheme.drwTo);
    _payload.scheme.series = parseInt(_payload.scheme.series);
    _payload.scheme.dop = moment(_payload.scheme.dop).format("YYYY-MM-DD");
    _payload.schemeDetailsList = _payload.schemeDetailsList.map((_x: any) => {
      if (_this.isNewEntry) {
        delete _x.schemeDtlsId;
      }
      _x.raffleId = parseInt(_x.raffleId);
      _x.rank = parseInt(_x.rank);
      _x.numberOfPrize = parseInt(_x.numberOfPrize);
      _x.przAmount = parseInt(_x.przAmount);
      _x.supTkt = parseInt(_x.supTkt);
      _x.splTkt = parseInt(_x.splTkt);
      _x.stkBon = parseInt(_x.stkBon);
      _x.tprz = parseInt(_x.tprz);
      _x.nod = parseInt(_x.nod);
      return _x;
    })

    this._apiService.modifyItemInfo(_payload, this.isNewEntry).subscribe({
      next: (_res: any) => {
        this._sharedService.hideProgress();
        console.log("Scheme Modify: ", _res);

        this.notifyService.success('Scheme Information has been submitted successfully.');

        this.resetForm();
      },
      error: (_err: any) => {
        this._sharedService.hideProgress();
        console.error("Modify Scheme Error: ", _err);
        this.isFormSubmitted = false;
      }
    })
  }

  resetForm = () => {
    // do your code
    this.validationMessages = {
      scheme: null,
      schemeDetailsList: []
    };

    this.scheme.reset();
    this.itemModifyForm.controls.schemeDetailsList = this.FB.array([]);

    this.addNewItem();
    this.isFormSubmitted = false;
  }

}

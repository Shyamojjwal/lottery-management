import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RaffleService } from '../../services';
import { appSettings } from '@app-core/config';
import { checkFormValidation, makeAllFormControlAsDirty, noWhitespaceValidator } from '@app-shared/helper/shared-functions';
import { modifyRaffleValidationMsg } from '@app-shared/helper/validation-messages';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { NotifyService } from '@app-core/services/notify.service';
import { SharedService } from '@app-core/services';


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
  selector: 'app-raffle-modification',
  templateUrl: './raffle-modification.component.html',
  styleUrls: ['./raffle-modification.component.scss'],
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
export class RaffleModificationComponent implements OnInit {

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

  private crntDate: any = moment().format('YYYY-MM-DD');

  constructor(
    private router: Router,
    private FB: FormBuilder,
    private apiService: RaffleService,
    private _notifyService: NotifyService,
    private _sharedService: SharedService,
    private activatedRoute: ActivatedRoute
  ) { }

  datePickerClosed = (_inputEvent: any) => {
    console.log("datePickerClosed: ", _inputEvent)
  }

  ngOnInit(): void {

   this.isNewEntry = this.router.url.includes('add-raffle');
    this.itemId = this.activatedRoute.snapshot.params['itemId'] || null;

    this.initModifyForm();

    if (this.isNewEntry) {
      this.isPreview = false;
      this.isModify = true;
    } else {
      this._sharedService.showProgress();
      this.isPreview = true;
      this.isModify = false;
      this.loadItemInfo();
    }

    setTimeout(() => {
      this.isInputReadOnly = false;
    }, 1000)
  }

  loadItemInfo = () => {
    this.apiService.getItemInfoByCode(this.itemId).subscribe({
      next: (_res: any) => {
        console.log("Item Info: ", _res);
        this._sharedService.hideProgress();
      },
      error: (_err: any) => {
        console.log("Item Info Error: ", _err);
        this._sharedService.hideProgress();
      }
    })
  }

  initModifyForm = () => {
    this.itemModifyForm = this.FB.group({
      raffleName: ["", [Validators.required]],
      raffleCode: ["", [Validators.required]],
      series: ["", [Validators.required]],
      playDay: [null, [Validators.required]],
      playTime: [null, [Validators.required]],
      drawTime: [null, [Validators.required]],
    });
  }

  trimAndValidateUserForm = (_field: string) => {
    const _filedValue = this.itemModifyForm.get(_field).value;
    if (_filedValue != undefined && _filedValue != null && typeof _filedValue == 'string') {
      this.itemModifyForm.get(_field).setValue(_filedValue.trim());
    }

    this.validateUserForm();
  };

  validateUserForm = () => {
    this.validationMessages = checkFormValidation(this.itemModifyForm, modifyRaffleValidationMsg);
  };

  setFieldTimeValue = (_inputEvent: any, _fieldName: string) => {
    this.itemModifyForm.get(_fieldName).setValue(_inputEvent);
    this.trimAndValidateUserForm(_fieldName);
  }

  continueInfoModification = () => {
    this.isPreview = false;
    this.isModify = true;
  }

  saveModificationForm = () => {
    this._sharedService.showProgress();
    
    if (!this.itemModifyForm.valid) {
      makeAllFormControlAsDirty(this.itemModifyForm);
      this.validateUserForm();
      this.isFormSubmitted = false;
      this._sharedService.hideProgress();
      return;
    }
    
    // this.isFormSubmitted = true;
    var _payload: any = { ...this.itemModifyForm.value, ...this._drawTime };
    if (!this.isNewEntry) {
      _payload.raffleCode = this.itemId;
    }
    
    _payload.series = parseInt(_payload.series);
    _payload.playDay = moment(`${_payload.playDay}`).format("YYYY-MM-DD");
    _payload.playTime = moment(`${this.crntDate} ${_payload.playTime}`, 'YYYY-MM-DD hh:mm a').format("HH:mm");
    _payload.drawTime = moment(`${this.crntDate} ${_payload.drawTime}`, 'YYYY-MM-DD hh:mm a').format("HH:mm:ss");
    
    delete _payload.drawsTime;
    
    console.log("_drawTime: ", this._drawTime);
    console.log("Payload: ", _payload, this.itemModifyForm.value);
    // return;
    
    this.apiService.modifyItemInfo(_payload, this.isNewEntry).subscribe({
      next: (_res: any) => {
        console.error("Modify Raffle Success: ", _res);
        this._sharedService.hideProgress();
        if(this.isNewEntry) {
          this._notifyService.success('Raffle added successfully.');
        } else {
          this._notifyService.success('Raffle information has been updated Successfully.');
        }
        
        this.router.navigate(['/raffle-management']);
      },
      error: (_err: any) => {
        console.error("Modify Raffle Error: ", _err);
        this.isFormSubmitted = false;
        this._sharedService.hideProgress();
      }
    })
  }

}

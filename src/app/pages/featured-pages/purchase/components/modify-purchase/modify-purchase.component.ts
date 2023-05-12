import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PurchaseService } from '../../services';
import { checkFormValidation, makeAllFormControlAsDirty } from '@app-shared/helper/shared-functions';
import { modifyPurchaseValidationMsg } from '@app-shared/helper/validation-messages';

@Component({
  selector: 'app-modify-purchase',
  templateUrl: './modify-purchase.component.html',
  styleUrls: ['./modify-purchase.component.scss']
})
export class ModifyPurchaseComponent implements OnInit {

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
    private apiService: PurchaseService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
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

    setTimeout(() => {
      this.isInputReadOnly = false;
    }, 1000);
  }

  loadItemInfo = () => {
    this.apiService.getItemInfo(this.itemId).subscribe({
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
      dsph: _this.FB.group({
        memoNo: [''],
        userId: ['', [Validators.required]],
        dsphDt: ['', [Validators.required]],
      }),
      dsphDtlsLst: _this.FB.array([])
    });
    this.addNewItem();
  }

  get dsphDtlsLst() {
    return this.itemModifyForm.controls['dsphDtlsLst'] as FormArray;
  }

  addNewItemToList = () => {
    const _singleItemForm: FormGroup = this.FB.group({
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

  addNewItem = () => {
    this.addNewItemToList();
  }

  removeItem = (_itemIndex: number) => {
    this.dsphDtlsLst.removeAt(_itemIndex);
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

    this.apiService.modifyItemInfo(_payload, this.isNewEntry).subscribe({
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

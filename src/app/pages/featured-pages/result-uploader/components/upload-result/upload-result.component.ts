import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from "@angular/router";
import { NotifyService, SharedService } from '@app-core/services';
import { ResultService } from '@app-featured-modules/result-uploader/services';
import { checkFormValidation, getFileExtention, makeAllFormControlAsDirty } from '@app-shared/helper/shared-functions';
import { resultUploadValidationMsg } from '@app-shared/helper/validation-messages';

@Component({
  selector: 'app-upload-result',
  templateUrl: './upload-result.component.html',
  styleUrls: ['./upload-result.component.scss']
})
export class UploadResultComponent implements OnInit {

  public itemModifyForm: FormGroup | any;
  public validationMessages: any = null;
  public isFormSubmitted: boolean = false;

  public _uploadedFileName: string = 'Drop file here...';

  private INPUT_FILE: any = null;

  private FILE_EXT_LIST: Array<string> = ['KOL']

  constructor(
    private router: Router,
    private FB: FormBuilder,
    private _apiService: ResultService,
    private _sharedService: SharedService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.initUploadForm();
  }

  initUploadForm = () => {
    this.itemModifyForm = this.FB.group({
      file: ['', [Validators.required, this.checkImageExtention]]
    })
  }

  checkImageExtention = (control: FormControl): { extension: boolean; } | null => {
    if (control.value && control.value != undefined) {
      var _ext: string | any = '';

      if (typeof (control.value) !== 'object') {
        _ext = getFileExtention(control.value);
      } else if (typeof (control.value) === 'object') {
        _ext = getFileExtention(control.value.name);
      }
      if (_ext && _ext != undefined && this.FILE_EXT_LIST.indexOf(_ext.toUpperCase()) > -1) {
        return null
      } else {
        return { 'extension': true }
      }
    } else {
      return null;
    }
  }

  changeInputFile = (_inputEvent: Event | any = null) => {
    if (_inputEvent?.target?.files?.length > 0) {
      this.INPUT_FILE = _inputEvent?.target.files[0];
      this._uploadedFileName = this.INPUT_FILE.name;
    } else if (this.INPUT_FILE == null) {
      this._uploadedFileName = 'Drop file here...';
      this.itemModifyForm.get('file').setValue("");
    }
    this.validateForm();
  }

  validateForm = () => {
    this.validationMessages = checkFormValidation(this.itemModifyForm, resultUploadValidationMsg)
  }

  uploadFile = () => {
    this._sharedService.showProgress();

    if (!this.itemModifyForm.valid) {
      makeAllFormControlAsDirty(this.itemModifyForm),
        this.validateForm();
      this._sharedService.hideProgress();
      return;
    }
    
    this.isFormSubmitted = true;
    
    const _formData = new FormData();
    _formData.append('file', this.INPUT_FILE);
    
    this._apiService.uploadFile(_formData).subscribe({
      next: (_res:any) => {
        console.log("Upload Result Success: ", _res);
        this._sharedService.hideProgress();
        this.notifyService.success('Result has been upoaded successfully.');
        this.resetForm();
      },
      error: (_err:any) => {
        console.error("Upload Result Error: ", _err);
        this._sharedService.hideProgress();
        this.notifyService.error('Error! Please try after some time.');
        this.INPUT_FILE = null;
        this.isFormSubmitted = false;
        this._uploadedFileName = 'Drop file here...';
        this.validationMessages.file = "Error! Please try after some time.";
      }
    })
  }

  resetForm = () => {
    this.itemModifyForm.reset();
    this.validationMessages = null;
    this.INPUT_FILE = null;
    this.isFormSubmitted = false;
    this._uploadedFileName = 'Drop file here...';
  }

}

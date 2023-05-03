import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services';
import { checkFormValidation, noWhitespaceValidator } from '@app-shared/helper/shared-functions';
import { modifyGroupValidationMsg } from '@app-shared/helper/validation-messages';
import { appSettings } from '@app-core/config';

@Component({
  selector: 'app-group-modification',
  templateUrl: './group-modification.component.html',
  styleUrls: ['./group-modification.component.scss']
})
export class GroupModificationComponent implements OnInit {

  public isNewEntry: boolean = true;
  public isPreview: boolean = false;
  public isModify: boolean = false;
  public isInputReadOnly: boolean = true;

  public itemModifyForm: FormGroup | any;
  public validationMessages: any = null;
  public isFormSubmitted: boolean = false;

  private groupId: any = null;
  private groupInfo: any = null;

  constructor(
    private router: Router,
    private FB: FormBuilder,
    private apiService: GroupService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isNewEntry = this.router.url.includes('add-group');
    this.groupId = this.activatedRoute.snapshot.params['groupId'] || null;

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
    }, 1000)
  }

  loadItemInfo = () => {
    this.apiService.getItemInfo(this.groupId).subscribe({
      next: (_res:any) => {
        console.log("Item Info: ", _res);
      },
      error: (_err:any) => {
        console.log("Item Info Error: ", _err);
      }
    })
  }

  initModifyForm = () => {
    this.itemModifyForm = this.FB.group({
      groupName: ["", [Validators.required, Validators.pattern(appSettings.RegExp.alphabet), noWhitespaceValidator]]
    });
  }

  trimAndValidateUserForm = (_field: string) => {
    this.itemModifyForm.get(_field).setValue(this.itemModifyForm.get(_field).value.trim());

    this.validateUserForm();
  };

  validateUserForm = () => {
    this.validationMessages = checkFormValidation(this.itemModifyForm, modifyGroupValidationMsg);
  };

  continueInfoModification = () => {
    this.isPreview = false;
    this.isModify = true;
  }

  saveModificationForm = () => {

  }

}

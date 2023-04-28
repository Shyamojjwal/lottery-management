import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-modification',
  templateUrl: './user-modification.component.html',
  styleUrls: ['./user-modification.component.scss']
})
export class UserModificationComponent implements OnInit {

  public isNewEntry: boolean = true;
  public isPreview: boolean = false;
  public isModify: boolean = false;

  public userModifyForm: FormGroup | any;

  private userCode: any = null;

  constructor(
    private router: Router,
    private FB: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isNewEntry = this.router.url.includes('new-user');
    this.userCode = this.activatedRoute.snapshot.params['userCode'] || null;

    this.initModifyForm();
  
    if(this.isNewEntry) {
      this.isPreview = false;
      this.isModify = true;
    } else {
      this.isPreview = true;
      this.isModify = false;
      this.loadUserInfo();
    }
  }

  initModifyForm = () => {
    this.userModifyForm = this.FB.group({})
  }

  loadUserInfo = () => {}

  continueInfoModification = () => {
    this.isPreview = false;
    this.isModify = true;
  }

  saveModificationForm = () => {}

}

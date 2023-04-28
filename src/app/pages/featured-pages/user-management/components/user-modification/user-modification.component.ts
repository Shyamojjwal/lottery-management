import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-modification',
  templateUrl: './user-modification.component.html',
  styleUrls: ['./user-modification.component.scss']
})
export class UserModificationComponent implements OnInit {

  public isNewEntry: boolean = true;
  public isPreview: boolean = false;
  public isModify: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isNewEntry = this.router.url.includes('new-user');
    console.log("this.isNewEntry: ", this.isNewEntry)
    if(this.isNewEntry) {
      this.isPreview = false;
      this.isModify = true;
    } else {
      this.isPreview = true;
      this.isModify = false;
    }
  }

  continueInfoModification = () => {
    this.isPreview = false;
    this.isModify = true;
  }

  saveModificationForm = () => {}

}

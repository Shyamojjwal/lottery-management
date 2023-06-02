import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app-core/authentication';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userInfo: any = null;

  constructor(
    private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.userInfo = this._authService.getUser();
  }

}

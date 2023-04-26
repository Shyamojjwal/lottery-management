import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app-auth-service/authentication.service';

@Component({
  selector: 'app-header-userbox',
  templateUrl: './header-userbox.component.html',
  styleUrls: ['./header-userbox.component.scss']
})
export class HeaderUserboxComponent implements OnInit {

  public loggedUserInfo: any = null;
  public userDesignation: string = '';

  constructor(
    private router: Router,
    private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loggedUserInfo = this._authService.getUser();
    this.checkUserDesignation();
    console.log("loggedUserInfo: ", this.loggedUserInfo)
  }

  checkUserDesignation = () => {
    const _userAuthorities: Array<any> = [...this.loggedUserInfo.authorities];

    this.userDesignation = _userAuthorities.shift()?.authority;

    if (_userAuthorities.length > 0) {
      this.userDesignation += ' + ' + _userAuthorities.length.toString();
    }
  }

  userSignOut = () => {
    this._authService.clearUserInfo();
    this.router.navigate(["/auth"]);
  }
}

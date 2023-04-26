import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app-auth-service/authentication.service';

@Component({
  selector: 'app-header-userbox',
  templateUrl: './header-userbox.component.html',
  styleUrls: ['./header-userbox.component.scss']
})
export class HeaderUserboxComponent implements OnInit {
  constructor(
    private router: Router,
    private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {

  }

  userSignOut = () => {
    this._authService.clearUserInfo();
    this.router.navigate(["/auth"]);
  }
}

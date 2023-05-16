import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { appSettings } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AppCookieService {

  private credentials: string = appSettings.credentialsKey;
  private userCredential: string = appSettings.userInfo;
  private userLoginRemember: string = appSettings.credentialsRememberKey;

  constructor(private _cookieService: CookieService) { }

  setUserToken = (_token: string) => {
    this._cookieService.set(
      this.credentials,
      _token,
      {
        path: '/'
      }
    );
  }

  setUserInfo = (_userinfo: any) => {
    this._cookieService.set(
      this.userCredential,
      JSON.stringify(_userinfo),
      {
        path: '/'
      }
    );
  }

  getToken = () => {
    return this._cookieService.get(this.credentials)
  }

  setRememberMeInfo = (_loginInfo: any) => {
    this._cookieService.set(
      this.userLoginRemember,
      JSON.stringify(_loginInfo),
      {
        path: '/'
      }
    );
  }

  getRememberMeInfo = () => {
    var _rememberInfo = this._cookieService.get(this.userLoginRemember);
    return JSON.parse(_rememberInfo);
  }
}

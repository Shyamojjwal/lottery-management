import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { appSettings } from '../config';
import { StorageService } from '@app-services/index';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private _cookieService: CookieService, private _storageService: StorageService) { }

  private credentials: string = appSettings.credentialsKey;
  private userCredential: string = appSettings.userInfo;

  /**
   * *If user is authenticated
   *
   * @returns boolean if authenticated
   * @date April 26, 2023
   * @developer Shyamojjwal Shit
   */
  public isAuthenticated(): boolean {
    if (this._storageService.get(this.credentials)) {
      return true;
    }
    return false;
  }

  /**
   * *Removing current user detail from storage
   *
   * @date April 26, 2023
   * @developer Shyamojjwal Shit
   */
  public clearUserInfo() {
    this._storageService.remove(this.credentials);
    this._storageService.remove(this.userCredential);
  }

  /**
   * *Getting current user token from storage
   *
   * @returns JWT Token
   * @date 29 Nov 2021
   * @developer Rahul Kundu
   */
  public getToken(): string {
    return this._storageService.get(this.credentials);
  }

  /**
   * *Getting current user information from storage
   *
   * @returns JWT Token
   * @date 29 Nov 2021
   * @developer Rahul Kundu
   */
  public getUser(): any {
    const _userInfo: any = this._storageService.get(this.userCredential);

    return JSON.parse(_userInfo);
  }
}

import { Injectable } from '@angular/core';
import { StorageService } from '@app-shared/services';
import { CookieService } from 'ngx-cookie-service';
import { appSettings } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private _cookieService: CookieService, private storageService: StorageService) { }

  private credentials: string = appSettings.credentialsKey;
  private userCredential: string = appSettings.userInfo;
  
  /**
   * *If user is authenticated
   *
   * @returns boolean if authenticated
   * @date 14 March 2023
   * @developer Shyamojjwal Shit
   */
  public isAuthenticated(): boolean {
    if (this._cookieService.get(this.credentials)) {
      return true;
    }
    return false;
  }
}

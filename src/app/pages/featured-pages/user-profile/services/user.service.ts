import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app-core/authentication';
import { ApiService } from '@app-core/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _apiService: ApiService,
    private _authService: AuthenticationService,
  ) { }

  getCrntUserInfo = () => {
    const _userInfo = this._authService.getUser();

    return this._apiService.get(`user/getUserByCode?userCode=${_userInfo.userCode}`);
  }
  
  modifyUserInformation = (_payload:any) => {
    return this._apiService.put(`user/changePassword?username=${_payload.username}&oldPassword=${_payload.oldPassword}&newPassword=${_payload.newPassword}`, {});
  }
  
  modifyUserCredential = (_payload:any) => {
    return this._apiService.put(`user/changePassword?username=${_payload.username}&oldPassword=${_payload.oldPassword}&newPassword=${_payload.newPassword}`, {});
  }
}

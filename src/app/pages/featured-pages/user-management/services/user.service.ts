import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '@app-services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _apiService: ApiService
  ) { }

  loadAllUsers = () => {
    return this._apiService.get('user/getAllUser');
  }

  loadAllUserInfo = (_userCode: string) => {
    return this._apiService.get(`user/getUserByCode?userCode=${_userCode}`);
  }

  submitModifyForm = (_payload:any, isNewEntry: boolean = true) => {
    if(isNewEntry) {
      return this._apiService.post('user/addNewUser', _payload);
    } else {
      return this._apiService.put('user/addNewUser', _payload);
    }
  }
}

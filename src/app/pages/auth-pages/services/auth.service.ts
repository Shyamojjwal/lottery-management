import { Injectable } from '@angular/core';
import { ApiService } from '@app-services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _apiService: ApiService
  ) { }

  userSignIn = (_payload: any) => {
    return this._apiService.post("generate-token", _payload);
  }

  getCrntUserInfo = () => {
    return this._apiService.get("current_user");
  }
}

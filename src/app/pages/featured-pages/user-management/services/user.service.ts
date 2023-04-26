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
}

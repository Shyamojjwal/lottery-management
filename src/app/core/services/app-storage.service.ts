import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { appSettings } from '@app-core/config';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private credentials: string = appSettings.credentialsKey;
  private userCredential: string = appSettings.userInfo;

  constructor(
    private _storageService: StorageService
  ) { }

  set = (_data:any) => {
    return this._storageService.save(_data.key, _data.value);
  }

  get = (_key:any) => {
    return this._storageService.get(_key)
  }

  remove = (_key:any) => {
    return this._storageService.remove(_key)
  }

  setUserToken = (_token: string) => {
    this._storageService.save(this.credentials, _token);
  }

  setUserInfo = (_userinfo: any) => {
    _userinfo.isAdmin = Boolean(_userinfo?.authorities?.find((x:any) => x.authority.toLowerCase() == 'admin'))
    this._storageService.save(this.userCredential, JSON.stringify(_userinfo));
  }

  getToken = () => {
    return this._storageService.get(this.credentials)
  }

  removeToken = () => {
    return this._storageService.remove(this.credentials)
  }

  removeUserInfo = () => {
    return this._storageService.remove(this.userCredential)
  }
}

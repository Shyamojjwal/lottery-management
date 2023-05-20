import { Injectable } from '@angular/core';
import { ApiService } from '@app-core/services';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {

  constructor(
    private _apiService: ApiService
  ) { }

  getAllItems = (itemId: number | string) => {
    return this._apiService.get(`getAllScheme`);
  }

  getItemInfo = (itemId: number | string) => {
    return this._apiService.get(`getSchemeById?schemeId=${itemId}`);
  }

  modifyItemInfo = (_payload: any, isNewItem: boolean = true) => {
    if(isNewItem) {
      return this._apiService.post(`addNewScheme`, _payload);
    } else {
      return this._apiService.put(`modifyScheme`, _payload);
    }
  }
}

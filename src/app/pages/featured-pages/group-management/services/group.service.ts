import { Injectable } from '@angular/core';
import { ApiService } from '@app-core/services';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private _apiService: ApiService
  ) { }

  loadAllGroups = () => {
    return this._apiService.get("getAllGroup");
  }

  getItemInfo = (itemId: number | string) => {
    return this._apiService.get(`getGroupById?groupId=${itemId}`);
  }

  modifyItemInfo = (_payload: any, isNewEntry: boolean = true) => {
    var _url: string = "";
    if (isNewEntry) {
      _url = "addNewGroup";
    } else {
      _url = "modifyGroup";
    }
    return this._apiService.post(`${_url}`, _payload);
  }
}

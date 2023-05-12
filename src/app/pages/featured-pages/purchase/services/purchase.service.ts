import { Injectable } from '@angular/core';
import { ApiService } from '@app-core/services';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private _apiService: ApiService
  ) { }

  loadAllItems = () => {
    return this._apiService.get("getAllRaffle");
  }

  getItemInfo = (itemId: number | string) => {
    return this._apiService.get(`getPurchaseByPrchId?prchId=${itemId}`);
  }

  modifyItemInfo = (_payload: any, isNewEntry: boolean = true) => {
    var _url: string = "";
    if (isNewEntry) {
      _url = "addNewPurchase";
    } else {
      _url = "modifyPurchase";
    }
    return this._apiService.post(`${_url}`, _payload);
  }
}

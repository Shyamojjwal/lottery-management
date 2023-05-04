import { Injectable } from '@angular/core';
import { ApiService } from '@app-core/services';

@Injectable({
  providedIn: 'root'
})
export class RaffleService {

  constructor(
    private _apiService: ApiService
  ) { }

  loadAllItems = () => {
    return this._apiService.get("getAllRaffle");
  }

  getItemInfoByCode = (itemId: number | string) => {
    return this._apiService.get(`getRaffleByCode?raffleCode=${itemId}`);
  }

  modifyItemInfo = (_payload: any, isNewEntry: boolean = true) => {
    var _url: string = "";
    if (isNewEntry) {
      _url = "addNewRaffle";
    } else {
      _url = "modifyRaffle";
    }
    return this._apiService.post(`${_url}`, _payload);
  }
}

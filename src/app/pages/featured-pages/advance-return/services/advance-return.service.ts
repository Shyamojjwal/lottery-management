import { Injectable } from '@angular/core';
import { ApiService } from '@app-core/services';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvanceReturnService {

  constructor(
    private _apiService: ApiService
  ) { }

  loadAllItems = () => {
    return null; //this._apiService.get("getAllRaffle");
  }

  getItemInfo = (itemId: number | string) => {
    return null; // this._apiService.get(`getPurchaseByPrchId?prchId=${itemId}`);
  }

  loadDependencyDataInfo = () :Observable<any> => {
    const _raffleApi = this._apiService.get('getAllRaffle');
    const _grpApi = this._apiService.get('getAllGroup');
    return forkJoin([_raffleApi,_grpApi])
  }

  modifyItemInfo = (_userId:number, _payload: any, isNewEntry: boolean = true) => {
    var _url: string = "";
    if (isNewEntry) {
      _url = `addNewAdvReturn?userId=${_userId}`;
    } else {
      _url = `modifyAdvReturn?userId=${_userId}`;
    }
    return this._apiService.post(`${_url}`, _payload);
  }
}

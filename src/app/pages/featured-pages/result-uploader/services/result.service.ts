import { Injectable } from '@angular/core';
import { ApiService } from '@app-core/services';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(
    private _apiService: ApiService
  ) { }

  uploadFile = (_payload:any) => {
    return this._apiService.post(`upload`, _payload);
  }
}

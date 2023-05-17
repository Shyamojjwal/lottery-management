import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RaffleService } from '../../services';
import { SharedService } from '@app-core/services';

@Component({
  selector: 'app-raffle-list',
  templateUrl: './raffle-list.component.html',
  styleUrls: ['./raffle-list.component.scss']
})
export class RaffleListComponent implements OnInit {

  public isApiInProgress: boolean = true;
  public allItemList: Array<any> = [];
  public filterArrayList: Array<any> = [];
  public filterForm: FormGroup | any;

  constructor(
    private FB: FormBuilder,
    private apiService: RaffleService,
    private _sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this._sharedService.showProgress();
    
    this.loadItemList();
    this.initFilterList();
  }
  
  loadItemList = () => {
    this.apiService.loadAllItems().subscribe({
      next: (_res: any) => {
        console.log("Response: ", _res);
        this.allItemList = this.filterArrayList = [...(_res?.data?.raffles || [])];
        this.isApiInProgress = false;
        this._sharedService.hideProgress();
      },
      error: (_err: any) => {
        console.error("Error: ", _err);
        this._sharedService.hideProgress();
      }
    })
  }

  initFilterList = () => {
    this.filterForm = this.FB.group({
      raffleName: [''],
      raffleCode: [''],
      series: [''],
      playDay: [''],
      playTime: [''],
    })

    this.filterForm.valueChanges.subscribe((_inputValues: any) => {

      setTimeout(() => {
        var _filterArray: Array<any> = [...this.allItemList];

        let _filterObj = Object.fromEntries(Object.entries(_inputValues).filter(([_, v]) => (v != null && v != '')));

        for (const _key of Object.keys(_filterObj)) {
          if (_inputValues[_key].trim().length > 0) {
            if (_key == 'raffleName') {
              _filterArray = _filterArray.filter((x: any) =>
                x.raffleName.toLowerCase().includes(_inputValues[_key].trim().toLowerCase())
              );
            }
            if (_key == 'raffleCode') {
              _filterArray = _filterArray.filter((x: any) =>
                x.raffleCode.toLowerCase().includes(_inputValues[_key].trim().toLowerCase())
              );
            }
            if (_key == 'series') {
              _filterArray = _filterArray.filter((x: any) =>
                x.series.toLowerCase().includes(_inputValues[_key].trim().toLowerCase())
              );
            }
            if (_key == 'playDay') {
              _filterArray = _filterArray.filter((x: any) =>
                x.playDay.toLowerCase().includes(_inputValues[_key].trim().toLowerCase())
              );
            }
            if (_key == 'playTime') {
              _filterArray = _filterArray.filter((x: any) =>
                x.playTime.toLowerCase().includes(_inputValues[_key].trim().toLowerCase())
              );
            }
          }
        }
        this.filterArrayList = [..._filterArray];
      }, 1000);
    })
  }

}

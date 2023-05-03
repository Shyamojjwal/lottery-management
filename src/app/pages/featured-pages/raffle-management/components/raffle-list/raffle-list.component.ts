import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RaffleService } from '../../services';

@Component({
  selector: 'app-raffle-list',
  templateUrl: './raffle-list.component.html',
  styleUrls: ['./raffle-list.component.scss']
})
export class RaffleListComponent implements OnInit {

  public isApiInProgress: boolean = true;
  public allGroupList: Array<any> = [];
  public filterArrayList: Array<any> = [];
  public filterForm: FormGroup | any;

  constructor(
    private FB: FormBuilder,
    private apiService: RaffleService
  ) { }

  ngOnInit(): void {
    this.loadItemList();
    this.initFilterList();
  }

  loadItemList = () => {

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
        var _filterArray: Array<any> = [...this.allGroupList];

        let _filterObj = Object.fromEntries(Object.entries(_inputValues).filter(([_, v]) => (v != null && v != '')));

        for (const _key of Object.keys(_filterObj)) {
          if (_inputValues[_key].trim().length > 0) {
            if (_key == 'groupName') {
              _filterArray = _filterArray.filter((x: any) =>
                x.groupName.toLowerCase().includes(_inputValues[_key].trim().toLowerCase())
              );
            }
          }
        }
        this.filterArrayList = [..._filterArray];
      }, 1000);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  public isApiInProgress: boolean = true;
  public allGroupList: Array<any> = [];
  public filterArrayList: Array<any> = [];
  public filterForm: FormGroup | any;

  constructor(
    private FB: FormBuilder,
    private apiService: GroupService
  ) { }

  ngOnInit(): void {
    this.loadGroupList();
    this.initFilterList();
  }

  loadGroupList = () => {
    this.apiService.loadAllGroups().subscribe({
      next: (_res:any) => {
        console.log("Group List Res: ", _res)

        this.allGroupList = this.filterArrayList = [..._res.data.groups];
        // console.log(this.userList)
        this.isApiInProgress = false;
      },
      error: (_err) => {
        console.error("Group List Err: ", _err)
      }
    })
  }

  initFilterList = () => {
    this.filterForm = this.FB.group({
      groupName: [""]
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
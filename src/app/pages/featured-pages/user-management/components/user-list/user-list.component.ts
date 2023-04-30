import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { IUser } from '@app-shared/models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: Array<IUser> = [];
  public filterUserList: Array<IUser> = [];

  public filterForm: FormGroup | any;

  public isApiInProgress: boolean = true;

  constructor(
    private FB: FormBuilder,
    private apiService: UserService
  ) { }

  ngOnInit(): void {
    this.initFilterForm();
    this.loadAllUserList();
  }

  initFilterForm = () => {
    this.filterForm = this.FB.group({
      userCode: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNo: [''],
      category: [''],
    })

    this.filterForm.valueChanges.subscribe((_inputValues: any) => {
      
      setTimeout(() => {
        var _filterArray: Array<any> = [...this.userList];

        let _filterObj = Object.fromEntries(Object.entries(_inputValues).filter(([_, v]) => (v != null && v != '')));

        for (const _key of Object.keys(_filterObj)) {
          if (_inputValues[_key].trim().length > 0) {
            if (_key == 'userCode') {
              _filterArray = _filterArray.filter((x: any) =>
                x.userCode.toLowerCase().includes(_inputValues[_key].trim().toLowerCase())
              );
              console.log("_filterArray: ", _filterArray)
            } else if (_key == 'firstName') {
              _filterArray = _filterArray.filter((x: any) =>
                x.firstName.toLowerCase().includes(_inputValues[_key].trim().toLowerCase())
              )
            } else if (_key == 'lastName') {
              _filterArray = _filterArray.filter((x: any) =>
                x.lastName.toLowerCase().includes(_inputValues[_key].trim().toLowerCase())
              )
            } else if (_key == 'email') {
              _filterArray = _filterArray.filter((x: any) =>
                x.email.toLowerCase().includes(_inputValues[_key].trim().toLowerCase())
              )
            } else if (_key == 'phoneNo') {
              _filterArray = _filterArray.filter((x: any) =>
                x.phoneNo.toLowerCase().includes(_inputValues[_key].trim().toLowerCase())
              )
            } else if (_key == 'category') {
              _filterArray = _filterArray.filter((x: any) =>
                x.userCategory.toLowerCase().includes(_inputValues[_key].trim().toLowerCase())
              )
            }
          }
        }
        this.filterUserList = [..._filterArray];
      }, 1000);
    })
  }

  loadAllUserList = () => {
    this.apiService.loadAllUsers().subscribe({
      next: (_res: any) => {
        this.userList = this.filterUserList = [..._res.data.user];

        // console.log(this.userList)
        this.isApiInProgress = false;
      },
      error: (_err: any) => {
        console.error("User List Error: ", _err)
      }
    })
  }

}

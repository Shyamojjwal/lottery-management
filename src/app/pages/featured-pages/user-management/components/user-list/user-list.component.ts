import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { IUser } from '@app-shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: Array<IUser> = [];

  constructor(
    private apiService: UserService
  ) { }

  ngOnInit(): void {
    this.loadAllUserList();
  }

  loadAllUserList = () => {
    this.apiService.loadAllUsers().subscribe({
      next: (_res: any) => {
        this.userList = [..._res.data.user];
        console.log(this.userList)
      },
      error: (_err: any) => {
        console.error("User List Error: ", _err)
      }
    })
  }

}

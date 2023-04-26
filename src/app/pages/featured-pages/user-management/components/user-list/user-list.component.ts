import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: Array<any> = [
    {
      "userCode": "abc-1",
      "firstName": "XYZ-1",
      "lastName": "PQA-1",
      "email": "test-1@yopmail.com",
      "phoneNo": "123456",
      "category": "Test-1"
    },
    {
      "userCode": "abc-2",
      "firstName": "XYZ-2",
      "lastName": "PQA-2",
      "email": "test-2@yopmail.com",
      "phoneNo": "123456",
      "category": "Test-2"
    },
    {
      "userCode": "abc-3",
      "firstName": "XYZ-3",
      "lastName": "PQA-3",
      "email": "test-3@yopmail.com",
      "phoneNo": "123456",
      "category": "Test-3"
    },
    {
      "userCode": "abc-4",
      "firstName": "XYZ-4",
      "lastName": "PQA-4",
      "email": "test-4@yopmail.com",
      "phoneNo": "123456",
      "category": "Test-4"
    },
    {
      "userCode": "abc-5",
      "firstName": "XYZ-5",
      "lastName": "PQA-5",
      "email": "test-5@yopmail.com",
      "phoneNo": "123456",
      "category": "Test-5"
    },
    {
      "userCode": "abc-6",
      "firstName": "XYZ-6",
      "lastName": "PQA-6",
      "email": "test@yopmail.com",
      "phoneNo": "123456",
      "category": "Test-6"
    },
    {
      "userCode": "abc-7",
      "firstName": "XYZ-7",
      "lastName": "PQA-7",
      "email": "test-7@yopmail.com",
      "phoneNo": "123456",
      "category": "Test-7"
    }
  ];

  constructor(
    private apiService: UserService
  ) { }

  ngOnInit(): void {
    // this.loadAllUserList();
  }

  loadAllUserList = () => {
    this.apiService.loadAllUsers().subscribe({
      next: (_res: any) => {
        // this.userList = [..._res.data]
        console.log("All Users: ", _res);
      },
      error: (_err: any) => {
        console.error("User List Error: ", _err)
      }
    })
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent, UserModificationComponent } from './components';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-list',
    pathMatch: "full"
  },
  {
    path: "user-list",
    component: UserListComponent,
    data: {title: "All User list"}
  },
  {
    path: "new-user",
    component: UserModificationComponent,
    data: {title: "Add New User"}
  },
  {
    path: ":userCode/modify-user",
    component: UserModificationComponent,
    data: {title: "Modify User"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }

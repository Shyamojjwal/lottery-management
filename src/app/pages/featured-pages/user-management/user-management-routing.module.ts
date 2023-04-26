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
    component: UserListComponent
  },
  {
    path: "new-user",
    component: UserModificationComponent
  },
  {
    path: "modify-user",
    component: UserModificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }

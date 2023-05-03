import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent, GroupModificationComponent } from './components';

const routes: Routes = [
  {
    path: "",
    component: GroupListComponent
  },
  {
    path: "add-group",
    component: GroupModificationComponent
  },
  {
    path: ":groupId/modify-group",
    component: GroupModificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupManagementRoutingModule { }

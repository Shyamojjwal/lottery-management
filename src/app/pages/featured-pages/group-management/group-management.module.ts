import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupManagementRoutingModule } from './group-management-routing.module';
import { GroupListComponent, GroupModificationComponent } from './components';
import { SharedModule } from '@app-shared/shared.module';


@NgModule({
  declarations: [
    GroupListComponent,
    GroupModificationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GroupManagementRoutingModule
  ]
})
export class GroupManagementModule { }

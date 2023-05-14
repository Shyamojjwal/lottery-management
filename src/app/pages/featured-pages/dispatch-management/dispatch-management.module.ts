import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatchManagementRoutingModule } from './dispatch-management-routing.module';
import { DispatchListComponent, ModifyDispatchComponent } from './components';
import { SharedModule } from '@app-shared/shared.module';


@NgModule({
  declarations: [
    DispatchListComponent,
    ModifyDispatchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DispatchManagementRoutingModule
  ]
})
export class DispatchManagementModule { }

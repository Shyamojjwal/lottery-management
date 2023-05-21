import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemeManagementRoutingModule } from './scheme-management-routing.module';
import { ListComponent, ModificationComponent } from './components';
import { SharedModule } from '@app-shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    ModificationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SchemeManagementRoutingModule
  ]
})
export class SchemeManagementModule { }

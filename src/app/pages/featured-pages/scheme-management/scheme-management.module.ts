import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemeManagementRoutingModule } from './scheme-management-routing.module';
import { ListComponent } from './components/list/list.component';
import { ModificationComponent } from './components/modification/modification.component';


@NgModule({
  declarations: [
    ListComponent,
    ModificationComponent
  ],
  imports: [
    CommonModule,
    SchemeManagementRoutingModule
  ]
})
export class SchemeManagementModule { }

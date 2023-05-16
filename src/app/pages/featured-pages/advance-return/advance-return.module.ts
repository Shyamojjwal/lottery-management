import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvanceReturnRoutingModule } from './advance-return-routing.module';
import { ModificationComponent } from './components/modification/modification.component';
import { SharedModule } from '@app-shared/shared.module';
import { ListComponent } from './components/list/list.component';


@NgModule({
  declarations: [
    ModificationComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdvanceReturnRoutingModule
  ]
})
export class AdvanceReturnModule { }

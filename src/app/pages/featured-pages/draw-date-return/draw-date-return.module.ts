import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrawDateReturnRoutingModule } from './draw-date-return-routing.module';
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
    DrawDateReturnRoutingModule
  ]
})
export class DrawDateReturnModule { }

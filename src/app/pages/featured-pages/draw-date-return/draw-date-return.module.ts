import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrawDateReturnRoutingModule } from './draw-date-return-routing.module';
import { ListComponent, ModificationComponent } from './components';


@NgModule({
  declarations: [
    ListComponent,
    ModificationComponent
  ],
  imports: [
    CommonModule,
    DrawDateReturnRoutingModule
  ]
})
export class DrawDateReturnModule { }

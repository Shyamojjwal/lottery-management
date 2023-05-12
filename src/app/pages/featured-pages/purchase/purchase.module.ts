import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseListComponent, ModifyPurchaseComponent } from './components';
import { SharedModule } from '@app-shared/shared.module';


@NgModule({
  declarations: [
    PurchaseListComponent,
    ModifyPurchaseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PurchaseRoutingModule
  ]
})
export class PurchaseModule { }

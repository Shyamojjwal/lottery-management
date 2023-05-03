import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaffleManagementRoutingModule } from './raffle-management-routing.module';
import { RaffleListComponent, RaffleModificationComponent } from './components';
import { SharedModule } from '@app-shared/shared.module';


@NgModule({
  declarations: [
    RaffleListComponent,
    RaffleModificationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RaffleManagementRoutingModule
  ]
})
export class RaffleManagementModule { }

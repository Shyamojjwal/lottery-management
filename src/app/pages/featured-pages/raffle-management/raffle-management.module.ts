import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';


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
    NgxMatTimepickerModule,
    RaffleManagementRoutingModule
  ]
})
export class RaffleManagementModule { }

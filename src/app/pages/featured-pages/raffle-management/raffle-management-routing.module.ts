import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaffleListComponent, RaffleModificationComponent } from './components';

const routes: Routes = [
  {
    path: "",
    component: RaffleListComponent
  },
  {
    path: "add-raffle",
    component: RaffleModificationComponent
  },
  {
    path: ":raffleCode/modify-raffle",
    component: RaffleModificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaffleManagementRoutingModule { }

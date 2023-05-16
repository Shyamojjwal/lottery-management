import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyPurchaseComponent, PurchaseListComponent } from './components';

const routes: Routes = [
  {
    path: "",
    // component: PurchaseListComponent
    component: ModifyPurchaseComponent
  },
  {
    path: "new-purchase",
    component: ModifyPurchaseComponent
  },
  {
    path: ":itemId/modify-purchase",
    component: ModifyPurchaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }

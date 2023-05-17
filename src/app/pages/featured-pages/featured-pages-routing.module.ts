import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "dashboard",
    loadChildren: () => import('@app-featured-modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: "user-profile",
    loadChildren: () => import('@app-featured-modules/user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
  {
    path: "user-management",
    loadChildren: () => import('@app-featured-modules/user-management/user-management.module').then(m => m.UserManagementModule)
  },
  {
    path: "group-management",
    loadChildren: () => import('@app-featured-modules/group-management/group-management.module').then(m => m.GroupManagementModule)
  },
  {
    path: "raffle-management",
    loadChildren: () => import('@app-featured-modules/raffle-management/raffle-management.module').then(m => m.RaffleManagementModule)
  },
  {
    path: "purchase-management",
    loadChildren: () => import('@app-featured-modules/purchase/purchase.module').then(m => m.PurchaseModule)
  },
  {
    path: "dispatch-management",
    loadChildren: () => import('@app-featured-modules/dispatch-management/dispatch-management.module').then(m => m.DispatchManagementModule)
  },
  {
    path: "draw-date-return-management",
    loadChildren: () => import('@app-featured-modules/draw-date-return/draw-date-return.module').then(m => m.DrawDateReturnModule)
  },
  {
    path: "advance-return-management",
    loadChildren: () => import('@app-featured-modules/advance-return/advance-return.module').then(m => m.AdvanceReturnModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturedPagesRoutingModule { }

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
    loadChildren: () => import('@app-featured-modules/dashboard/dashboard.module').then(m=>m.DashboardModule)
  },
  {
    path: "user-management",
    loadChildren: () => import('@app-featured-modules/user-management/user-management.module').then(m=>m.UserManagementModule)
  },
  {
    path: "group-management",
    loadChildren: () => import('@app-featured-modules/group-management/group-management.module').then(m=>m.GroupManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturedPagesRoutingModule { }

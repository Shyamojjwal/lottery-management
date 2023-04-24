import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent, FeaturedLayoutComponent } from '@app-layouts/layout-blueprints';
import { LoginAuthGuard, UserAuthGuard } from './core/guards';

const routes: Routes = [
  {
    path: "",
    component: FeaturedLayoutComponent,
    // canActivate: [UserAuthGuard],
    canActivate: [],
    loadChildren: ()=>import("@app-featured-modules/featured-pages.module").then(m=>m.FeaturedPagesModule)
  },
  {
    path: "auth",
    canActivate: [LoginAuthGuard],
    component: AuthLayoutComponent,
    loadChildren: ()=>import("@app-auth-modules/auth-pages.module").then(m=>m.AuthPagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DispatchListComponent, ModifyDispatchComponent } from './components';

const routes: Routes = [
  {
    path: "",
    // component: DispatchListComponent
    component: ModifyDispatchComponent
  },
  {
    path: "new-dispatch",
    component: ModifyDispatchComponent
  },
  {
    path: ":itemId/modify-dispatch",
    component: ModifyDispatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispatchManagementRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificationComponent } from './components';

const routes: Routes = [
  {
    path: "",
    component: ModificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvanceReturnRoutingModule { }

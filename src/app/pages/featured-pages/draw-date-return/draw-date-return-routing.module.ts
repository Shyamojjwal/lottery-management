import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent, ModificationComponent } from './components';

const routes: Routes = [
  {
    path: "",
    // component: ListComponent
    component: ModificationComponent
  },
  {
    path: "new-draw-date-return",
    component: ModificationComponent
  },
  {
    path: ":itemId/modify-draw-date-return",
    component: ModificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrawDateReturnRoutingModule { }

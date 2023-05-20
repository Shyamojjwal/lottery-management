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
    path: "new-scheme",
    component: ModificationComponent
  },
  {
    path: ":itemId/scheme-modification",
    component: ModificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemeManagementRoutingModule { }

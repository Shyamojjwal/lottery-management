import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadResultComponent } from './components';

const routes: Routes = [
  {
    path: "",
    component: UploadResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultUploaderRoutingModule { }

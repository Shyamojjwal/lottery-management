import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultUploaderRoutingModule } from './result-uploader-routing.module';
import { UploadResultComponent } from './components';
import { SharedModule } from '@app-shared/shared.module';


@NgModule({
  declarations: [
    UploadResultComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ResultUploaderRoutingModule
  ]
})
export class ResultUploaderModule { }

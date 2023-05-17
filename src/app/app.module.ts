import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthLayoutComponent, FeaturedLayoutComponent } from '@app-layouts/layout-blueprints';
import {
  FooterComponent,
  HeaderComponent,
  SidebarComponent,
  SidebarMenuComponent,
  HeaderUserboxComponent,
  SidebarHeaderComponent,
} from '@app-layouts/layout-components';
import { SharedModule } from '@app-shared/shared.module';
import { NgProgressModule } from 'ngx-progressbar';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTPInterceptorProvider } from '@app-interceptor/index';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

const _declarations: Array<any> = [
  AppComponent,
  AuthLayoutComponent,
  FeaturedLayoutComponent,
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  HeaderUserboxComponent,
  SidebarHeaderComponent,
  SidebarMenuComponent
]

const _MODULES: Array<any> = [
  SharedModule,
  BrowserModule,
  NotifierModule.withConfig(notifierDefaultOptions),
  NgProgressModule,
  AppRoutingModule,
  MatProgressBarModule,
  BrowserAnimationsModule,
  BsDropdownModule.forRoot()
]

const _PROVIDERS: Array<any> = [HTTPInterceptorProvider];

@NgModule({
  declarations: [..._declarations],
  imports: [..._MODULES],
  providers: [..._PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }

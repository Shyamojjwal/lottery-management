import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthLayoutComponent, FeaturedLayoutComponent } from '@app-layouts/layout-blueprints';
import { FooterComponent, HeaderComponent, HeaderUserboxComponent, SidebarComponent, SidebarHeaderComponent, SidebarMenuComponent } from '@app-layouts/layout-components';
import { SharedModule } from '@app-shared/shared.module';
import { NgProgressModule } from 'ngx-progressbar';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTPInterceptorProvider } from '@app-interceptor/index';
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";

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
  NgProgressModule,
  AppRoutingModule,
  LoadingBarRouterModule,
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

import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '@app-layouts/theme-options';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss']
})
export class SidebarHeaderComponent implements OnInit {

  constructor(public globals: ThemeOptions) { }

  ngOnInit(): void {
  }
  toggleSidebarMobileOpen() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

}

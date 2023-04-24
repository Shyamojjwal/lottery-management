import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '@app-layouts/theme-options';
import Scrollbar from 'smooth-scrollbar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public globals: ThemeOptions) {}

  ngOnInit(): void {
    const _elementEl = document.getElementById('left-menu-scrollbar');
    if(_elementEl) {
      Scrollbar.init(_elementEl, {});
    }
  }

  toggleSidebarMobileOpen() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

}

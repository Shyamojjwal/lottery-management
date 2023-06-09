import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '@app-layouts/theme-options';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public globals: ThemeOptions) { }

  ngOnInit(): void {
  }

  toggleSideBar = () => {
    const _bodyEl = document.querySelector('body');
    if(_bodyEl && document.querySelector('body') != undefined) {
      const isSidebarHidden = _bodyEl.classList.contains('sidebar-hidden');

      if(!isSidebarHidden) {
        _bodyEl.classList.add('sidebar-hidden');
      } else {
        _bodyEl.classList.remove('sidebar-hidden');
      }
    }
  }

  toggleSidebarMobileOpen() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

}

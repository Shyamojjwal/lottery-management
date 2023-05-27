import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app-core/authentication';
import { SidebarMenuService } from '@app-core/services';
import { ThemeOptions } from '@app-layouts/theme-options';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0, opacity: '0' })),
      state('down', style({ height: '*', opacity: '1' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarMenuComponent implements OnInit {

  public menus: any = [];
  private innerWidth: number = 0;
  public userInfo: any = null;

  constructor(
    private router: Router,
    public globals: ThemeOptions,
    private _authService: AuthenticationService,
    private sidebarMenuService: SidebarMenuService,
) { 
  this.menus = [ ...this.sidebarMenuService.getMenuList() ];
}

  ngOnInit(): void {
    const theActiveMenu = this.sidebarMenuService.getMenuItemByUrl(this.menus, this.router.url);
    this.userInfo = this._authService.getUser();
    if (theActiveMenu) {
      this.toggle(theActiveMenu);
    }

    this.innerWidth = window.innerWidth;
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.innerWidth = window.innerWidth;
  }

  toggleSidebarMobileOpen() {
    if (this.innerWidth < 992) {
      this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
    }
  }

  toggle(currentMenu:any) {
    this.menus = this.sidebarMenuService.toggleMenuItem(this.menus, currentMenu);
  }

  getState(currentMenu:any) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

}

import { Injectable } from '@angular/core';

interface MenuItem {
  title: string;
  type: string;
  badge?: {
    class: string;
    text: string;
  };
  link?: string;
  active?: boolean;
  icon?: string;
  submenus?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  menus: MenuItem[] = [
    {
      "title": "Navigation menu",
      "type": "header"
    },
    {
      "title": "Dashboards",
      "type": "simple",
      "icon": "<i class=\"pe-7s-safe\"> </i>",
      "link": "/dashboard"
    },
    {
      "title": "Site Users",
      "type": "header"
    },
    {
      "title": "User Management",
      "type": "dropdown",
      "icon": "<i class=\"pe-7s-keypad\"></i>",
      "submenus": [
        {
          "title": "User List",
          "type": "simple",
          "link": "/user-list"
        },
        {
          "title": "User Import",
          "type": "simple",
          "link": "/user-import"
        }
      ]
    },
    // {
    //   "title": "Cards",
    //   "type": "dropdown",
    //   "icon": "<i class=\"pe-7s-box2\"></i>",
    //   "badge": {
    //     "class": "badge badge-warning",
    //     "text": "280+"
    //   },
    //   "submenus": [
    //     {
    //       "title": "Cards examples 3",
    //       "type": "simple",
    //       "link": "/cards-3"
    //     }
    //   ]
    // },
    // {
    //   "title": "List Groups",
    //   "type": "simple",
    //   "icon": "<i class=\"pe-7s-id\"></i>",
    //   "link": "/list-groups"
    // },
    // {
    //   "title": "Presentation Blocks",
    //   "type": "dropdown",
    //   "icon": "<i class=\"pe-7s-box2\"></i>",
    //   "submenus": [
    //     {
    //       "title": "Landing page",
    //       "type": "simple",
    //       "link": ""
    //     }
    //   ]
    // },
    // {
    //   "title": "Widgets",
    //   "type": "dropdown",
    //   "icon": "<i class=\"pe-7s-display2\"></i>",
    //   "submenus": [
    //     {
    //       "title": "Accordions",
    //       "type": "simple",
    //       "link": "/accordions"
    //     },
    //     {
    //       "title": "Modal dialogs",
    //       "type": "simple",
    //       "link": "/modals"
    //     },
    //     {
    //       "title": "Notifications",
    //       "type": "simple",
    //       "link": "/notifications"
    //     },
    //     {
    //       "title": "Carousels",
    //       "type": "simple",
    //       "link": "/carousels"
    //     },
    //     {
    //       "title": "Popovers",
    //       "type": "simple",
    //       "link": "/popovers"
    //     },
    //     {
    //       "title": "Tooltips",
    //       "type": "simple",
    //       "link": "/tooltips"
    //     },
    //     {
    //       "title": "Tabs",
    //       "type": "simple",
    //       "link": "/tabs"
    //     }
    //   ]
    // },
    // {
    //   "title": "Tables",
    //   "type": "header"
    // },
    // {
    //   "title": "Regular Tables",
    //   "type": "dropdown",
    //   "icon": "<i class=\"pe-7s-albums\"></i>",
    //   "submenus": [
    //     {
    //       "title": "Tables examples 1",
    //       "type": "simple",
    //       "link": "/regular-tables-1"
    //     },
    //     {
    //       "title": "Tables examples 4",
    //       "type": "simple",
    //       "link": "/regular-tables-4"
    //     }
    //   ]
    // },
    // {
    //   "title": "Forms",
    //   "type": "header"
    // },
    // {
    //   "title": "Elements",
    //   "type": "dropdown",
    //   "icon": "<i class=\"pe-7s-menu\"></i>",
    //   "submenus": [
    //     {
    //       "title": "Layout",
    //       "type": "simple",
    //       "link": "/forms-layout"
    //     },
    //     {
    //       "title": "Controls",
    //       "type": "simple",
    //       "link": "/forms-controls"
    //     }
    //   ]
    // },
    // {
    //   "title": "Others",
    //   "type": "header"
    // },
    // {
    //   "title": "Charts",
    //   "type": "dropdown",
    //   "icon": "<i class=\"pe-7s-graph1\"></i>",
    //   "submenus": [
    //     {
    //       "title": "Apex Charts",
    //       "type": "simple",
    //       "link": "/apex-charts"
    //     }
    //   ]
    // },
    // {
    //   "title": "Maps",
    //   "type": "simple",
    //   "icon": "<i class=\"pe-7s-map-2\"></i>",
    //   "link": "/maps"
    // }
  ];

  constructor() { }

  getMenuList = () => {
    return this.menus;
  }

  getMenuItemByUrl = (aMenus: MenuItem[], aUrl: string): MenuItem | any => {
    for (const theMenu of aMenus) {
      if (theMenu.link && theMenu.link === aUrl) {
        return theMenu;
      }

      if (theMenu.submenus && theMenu.submenus.length > 0) {
        const foundItem = this.getMenuItemByUrl(theMenu.submenus, aUrl);
        if (foundItem) {
          return foundItem;
        }
      }
    }

    return undefined;
  }

  toggleMenuItem = (aMenus: MenuItem[], aCurrentMenu: MenuItem): MenuItem[] => {
    return aMenus.map((aMenu: MenuItem) => {
      if (aMenu === aCurrentMenu) {
        aMenu.active = !aMenu.active;
      } else {
        aMenu.active = false;
      }

      if (aMenu.submenus && aMenu.submenus.length > 0) {
        aMenu.submenus = this.toggleMenuItem(aMenu.submenus, aCurrentMenu);

        if (aMenu.submenus.find(aChild => aChild.active)) {
          aMenu.active = true;
        }
      }

      return aMenu;
    });
  }
}

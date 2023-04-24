import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '@app-layouts/theme-options';

@Component({
  selector: 'app-featured-layout',
  templateUrl: './featured-layout.component.html',
  styleUrls: ['./featured-layout.component.scss']
})
export class FeaturedLayoutComponent implements OnInit {

  constructor(public globals: ThemeOptions) { }

  ngOnInit(): void {
  }

}

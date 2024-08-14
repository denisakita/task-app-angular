import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {MENU, MenuItem} from "../home/menu";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile: boolean = false;
  isCollapsed: boolean = false;
  isOpen: boolean = false;
  activeItem: any;
  menu: MenuItem[] = MENU;


  constructor(private observer: BreakpointObserver, public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
        this.isOpen = true;
      }
    });
  }

  toggleMenu() {
    this.sidenav.toggle();
  }

  isActive(item: any): boolean {
    return this.activeItem === item;
  }

  setActive(item: any): void {
    this.activeItem = item;
  }


  logout() {
    console.log('logout')
  }
}

import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Event as NavigationEvent, NavigationStart, Router } from '@angular/router';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'unipollApp';

  private _hide_sidebar: boolean = false;

  get hideSidebar(): boolean {
    return this._hide_sidebar;
  }

  set hideSidebar(value: boolean) {
    this._hide_sidebar = value;
  }

  constructor(private router: Router) {
    this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
            this._hide_sidebar = (event.url == '/login' || event.url == '/register');
        }
      });
  }
}

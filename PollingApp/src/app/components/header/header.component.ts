import { Component, ChangeDetectorRef } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  headerType: number = 0;
  toggleActive = false;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private sidenav: SidenavService,
   changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

   this.mobileQuery = media.matchMedia('(max-width: 600px)');
   this._mobileQueryListener = () => changeDetectorRef.detectChanges();
   this.mobileQuery.addListener(this._mobileQueryListener);
  }

  newHeader(headerType: number) {
    this.headerType = headerType;
  }

  toggleSidenav() {
       this.toggleActive = !this.toggleActive;
       this.sidenav.toggle();
  }
}

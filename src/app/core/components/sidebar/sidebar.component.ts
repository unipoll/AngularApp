import { Component, ChangeDetectorRef, ViewChild  } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @ViewChild('sidebar', {static: true}) public sidenav!: MatSidenav;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private sidenavService: SidenavService,
    private authService: AuthService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

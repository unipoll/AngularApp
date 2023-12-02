import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerType: number = 0;
  toggleActive = false;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  
  private _currentTheme = 'light';

  constructor(private sidenav: SidenavService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    // Check if _currentTheme is set in localStorage
    if (localStorage.getItem('_currentTheme') == 'dark' || localStorage.getItem('_currentTheme') == 'light') { 
      this._currentTheme = localStorage.getItem('_currentTheme')!;
    }
  }

  get currentTheme(): string {
    return this._currentTheme;
  }

  newHeader(headerType: number) {
    this.headerType = headerType;
  }

  toggleSidenav() {
    this.toggleActive = !this.toggleActive;
    this.sidenav.toggle();
  }

  toggleTheme() {
    this._currentTheme = this._currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('_currentTheme', this._currentTheme);    
  }
} 